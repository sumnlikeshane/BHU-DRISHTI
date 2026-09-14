import { spawn } from 'node:child_process'
import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { resolve } from 'node:path'

const options = Object.fromEntries(
  process.argv.slice(2).map((argument) => {
    const [key, ...value] = argument.replace(/^--/, '').split('=')
    return [key, value.join('=') || true]
  }),
)
const url = String(options.url ?? 'http://127.0.0.1:4173/')
const cpu = Number(options.cpu ?? 1)
const latency = Number(options.latency ?? 0)
const downloadKbps = Number(options.download ?? 0)
const uploadKbps = Number(options.upload ?? downloadKbps)
const output = resolve(String(options.output ?? 'map-startup-trace.json'))
const screenshot = output.replace(/\.json$/, '.png')
const loadingScreenshotMs = Number(options.loadingScreenshot ?? 0)
const loadingScreenshot = output.replace(/\.json$/, '-loading.png')
const chromePath =
  process.env.BHU_CHROME_PATH ??
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const profile = await mkdtemp(resolve(tmpdir(), 'bhu-map-trace-'))

async function waitForDebugger(port, child) {
  const deadline = Date.now() + 10_000
  while (Date.now() < deadline) {
    if (child.exitCode !== null) {
      throw new Error(`Chrome exited before tracing (code ${child.exitCode})`)
    }
    try {
      const response = await fetch(`http://127.0.0.1:${port}/json/version`)
      if (response.ok) return (await response.json()).webSocketDebuggerUrl
    } catch {
      // Chrome has not opened the endpoint yet.
    }
    await new Promise((resolveWait) => setTimeout(resolveWait, 50))
  }
  throw new Error('Chrome debugging endpoint timed out')
}

class CdpConnection {
  #id = 0
  #pending = new Map()
  #listeners = new Map()

  constructor(socket) {
    this.socket = socket
    socket.addEventListener('message', ({ data }) => {
      const message = JSON.parse(data)
      if (message.id) {
        const pending = this.#pending.get(message.id)
        if (!pending) return
        this.#pending.delete(message.id)
        if (message.error) pending.reject(new Error(message.error.message))
        else pending.resolve(message.result)
        return
      }
      for (const listener of this.#listeners.get(message.method) ?? []) {
        listener(message)
      }
    })
  }

  static async connect(webSocketUrl) {
    const socket = new WebSocket(webSocketUrl)
    await new Promise((resolveOpen, reject) => {
      socket.addEventListener('open', resolveOpen, { once: true })
      socket.addEventListener('error', reject, { once: true })
    })
    return new CdpConnection(socket)
  }

  on(method, listener) {
    const listeners = this.#listeners.get(method) ?? []
    listeners.push(listener)
    this.#listeners.set(method, listeners)
    return () =>
      this.#listeners.set(
        method,
        listeners.filter((candidate) => candidate !== listener),
      )
  }

  send(method, params = {}, sessionId) {
    const id = ++this.#id
    this.socket.send(JSON.stringify({ id, method, params, sessionId }))
    return new Promise((resolveCommand, reject) => {
      this.#pending.set(id, { reject, resolve: resolveCommand })
    })
  }
}

async function poll(connection, sessionId, expression, timeoutMs = 20_000) {
  const deadline = Date.now() + timeoutMs
  while (Date.now() < deadline) {
    const result = await connection.send(
      'Runtime.evaluate',
      { expression, returnByValue: true },
      sessionId,
    )
    if (result.result.value) return result.result.value
    await new Promise((resolveWait) => setTimeout(resolveWait, 25))
  }
  throw new Error('Map readiness mark timed out')
}

const debugPort = 9_200 + (process.pid % 500)
const chrome = spawn(chromePath, [
  '--headless=new',
  `--remote-debugging-port=${debugPort}`,
  `--user-data-dir=${profile}`,
  '--no-first-run',
  '--disable-background-networking',
  '--disable-component-update',
  '--disable-default-apps',
  '--disable-extensions',
  '--disable-sync',
  '--metrics-recording-only',
  'about:blank',
])

try {
  const debuggerUrl = await waitForDebugger(debugPort, chrome)
  const connection = await CdpConnection.connect(debuggerUrl)
  const { targetId } = await connection.send('Target.createTarget', {
    url: 'about:blank',
  })
  const { sessionId } = await connection.send('Target.attachToTarget', {
    targetId,
    flatten: true,
  })

  await Promise.all([
    connection.send('Page.enable', {}, sessionId),
    connection.send('Runtime.enable', {}, sessionId),
    connection.send('Network.enable', {}, sessionId),
    connection.send('Performance.enable', {}, sessionId),
  ])
  await connection.send(
    'Network.setCacheDisabled',
    { cacheDisabled: true },
    sessionId,
  )
  if (cpu > 1) {
    await connection.send(
      'Emulation.setCPUThrottlingRate',
      { rate: cpu },
      sessionId,
    )
  }
  if (latency > 0 || downloadKbps > 0) {
    await connection.send(
      'Network.emulateNetworkConditions',
      {
        offline: false,
        latency,
        downloadThroughput: downloadKbps ? (downloadKbps * 1024) / 8 : -1,
        uploadThroughput: uploadKbps ? (uploadKbps * 1024) / 8 : -1,
        connectionType: 'cellular4g',
      },
      sessionId,
    )
  }

  const traceEvents = []
  connection.on('Tracing.dataCollected', ({ params }) => {
    traceEvents.push(...params.value)
  })
  await connection.send('Tracing.start', {
    categories:
      'blink.user_timing,devtools.timeline,disabled-by-default-devtools.timeline,v8,loading,gpu',
    options: 'sampling-frequency=10000',
    transferMode: 'ReportEvents',
  })
  await connection.send('Page.navigate', { url }, sessionId)
  const loadingCapture = loadingScreenshotMs
    ? new Promise((resolveCapture) =>
        setTimeout(resolveCapture, loadingScreenshotMs),
      ).then(async () => {
        const loadingImage = await connection.send(
          'Page.captureScreenshot',
          { format: 'png', fromSurface: true },
          sessionId,
        )
        await writeFile(
          loadingScreenshot,
          Buffer.from(loadingImage.data, 'base64'),
        )
      })
    : Promise.resolve()
  await poll(
    connection,
    sessionId,
    `performance.getEntriesByName('bhu-map:first-webgl-frame-painted').length`,
  )
  await loadingCapture

  const snapshot = await connection.send(
    'Runtime.evaluate',
    {
      expression: `JSON.stringify({
        navigation: performance.getEntriesByType('navigation').map(({startTime, domInteractive, domContentLoadedEventEnd, loadEventEnd, responseEnd}) => ({startTime, domInteractive, domContentLoadedEventEnd, loadEventEnd, responseEnd})),
        marks: performance.getEntriesByType('mark').filter(({name}) => name.startsWith('bhu-map:')).map(({name,startTime}) => ({name,startTime})),
        resources: performance.getEntriesByType('resource').filter(({name}) => /(?:assets|src|data\\/maps)/.test(name)).map(({name,initiatorType,startTime,responseEnd,duration,transferSize,decodedBodySize}) => ({name,initiatorType,startTime,responseEnd,duration,transferSize,decodedBodySize})),
        canvas: (() => { const node = document.querySelector('.map-canvas'); return node ? {ready: node.getAttribute('data-ready'), opacity: getComputedStyle(node).opacity} : null })(),
        fallback: (() => { const node = document.querySelector('.map-fallback'); return node ? {visible: node.getAttribute('data-visible'), opacity: getComputedStyle(node).opacity} : null })()
      })`,
      returnByValue: true,
    },
    sessionId,
  )
  const metrics = await connection.send('Performance.getMetrics', {}, sessionId)
  const image = await connection.send(
    'Page.captureScreenshot',
    { format: 'png', fromSurface: true },
    sessionId,
  )

  const traceComplete = new Promise((resolveTrace) => {
    connection.on('Tracing.tracingComplete', resolveTrace)
  })
  await connection.send('Tracing.end')
  await traceComplete

  const result = {
    profile: { cacheDisabled: true, cpu, downloadKbps, latency, uploadKbps },
    url,
    ...JSON.parse(snapshot.result.value),
    browserMetrics: Object.fromEntries(
      metrics.metrics.map(({ name, value }) => [name, value]),
    ),
    traceEvents,
  }
  await writeFile(output, JSON.stringify(result))
  await writeFile(screenshot, Buffer.from(image.data, 'base64'))
  const compact = {
    ...result,
    traceEvents: `${traceEvents.length} events -> ${output}`,
  }
  console.log(JSON.stringify(compact, null, 2))
} finally {
  chrome.kill('SIGTERM')
  await rm(profile, { recursive: true, force: true })
}
