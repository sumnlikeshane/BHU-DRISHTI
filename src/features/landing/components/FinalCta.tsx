import { previewActions } from '../content/landingStory'

export function PreviewAction({
  action,
  primary = false,
}: {
  action: (typeof previewActions)[keyof typeof previewActions]
  primary?: boolean
}) {
  return (
    <a
      className={
        primary ? 'preview-action preview-action--primary' : 'preview-action'
      }
      href={action.href}
    >
      {action.label} <span>{action.qualifier}</span>
    </a>
  )
}

export function FinalCta() {
  return (
    <div className="final-actions" id="preview-access">
      <PreviewAction action={previewActions.commandCentre} primary />
      <PreviewAction action={previewActions.demo} />
      <PreviewAction action={previewActions.architecture} />
      <p>
        Command-centre access is authenticated and limited by assigned role and
        administrative scope.
      </p>
    </div>
  )
}
