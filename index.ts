import { FABRuntime } from '@fab/core'

type Args = {
  enabled?: string | boolean
  port?: number
}

export default ({ Router, Cache }: FABRuntime, args: Args = {}) => {
  const { enabled, port } = args
  if (!port)
    return console.log(
      `[@fab/plugin-dev-proxy] Required argument 'port' missing. Skipping.`
    )
  if (!enabled)
    return console.log(
      `[@fab/plugin-dev-proxy] ${
        typeof enabled === 'undefined'
          ? `Required argument 'enabled' missing.`
          : `'enabled' argument for dev-proxy is falsy (${enabled}).`
      } Skipping.`
    )

  Router.onAll(async ({ request, settings }) => {
    // We know 'enabled` is truthy, but if it's a string check the settings
    if (typeof enabled === 'string' && !settings[enabled]) return undefined

    const proxied_url = new URL(request.url)
    proxied_url.host = `localhost:${args.port}`
    const proxied = new Request(proxied_url.href, request)
    return fetch(proxied)
  })
}
