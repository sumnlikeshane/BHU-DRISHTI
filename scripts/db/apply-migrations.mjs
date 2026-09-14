import { readdirSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { dirname, join, resolve } from 'node:path'

const scriptDirectory = dirname(fileURLToPath(import.meta.url))
const projectRoot = resolve(scriptDirectory, '../..')
const migrationsDirectory = join(projectRoot, 'db/migrations')
const databaseUrl = process.env.DATABASE_URL_DIRECT

if (!databaseUrl) {
  console.error(
    'DATABASE_URL_DIRECT is required. Use the direct Supabase Postgres connection string.',
  )
  process.exit(1)
}

const migrationFiles = readdirSync(migrationsDirectory)
  .filter((file) => file.endsWith('.sql'))
  .sort()

for (const file of migrationFiles) {
  console.log(`Applying ${file}`)
  const result = spawnSync(
    'psql',
    [
      databaseUrl,
      '-v',
      'ON_ERROR_STOP=1',
      '-f',
      join(migrationsDirectory, file),
    ],
    { cwd: projectRoot, stdio: 'inherit' },
  )

  if (result.error) {
    console.error(`Unable to start psql: ${result.error.message}`)
    process.exit(1)
  }
  if (result.status !== 0) process.exit(result.status ?? 1)
}

console.log(`Applied ${migrationFiles.length} migrations successfully.`)
