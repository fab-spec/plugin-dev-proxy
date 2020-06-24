# `@fab/plugin-dev-proxy`

Drop this into your `fab.config.json5` to short-circuit the FAB during development:

```json5
{
  plugins: {
    // ...
    // any plugins here will run as normal
    // ...
    '@fab/plugin-dev-proxy': {
      port: 5000,
      enabled: true
    },
    // ...
    // these plugins won't be reached
    // ...
  }
}
```

This will intercept all requests that make it through to that plugin and forward them onto `localhost:5000`, which means that any plugins that are listed _after_ this in the `fab.config.json5` file will never be reached.

This is designed to be used with the local `fab serve` command (potentially with the experimental `--proxy-ws` flag for proxying websockets).

> 👉 Note: with the above config, `plugin-dev-proxy` will _always_ intercept requests, which is designed for temporary usage. **Pushing this to production will result in a broken FAB**, so be sure to comment it out (or set `enabled: false`) before you commit & push!

## Environment-specific usage

To use this plugin on a more permanent basis, you can pass a second argument:

```json5
{
  plugins: {
    // ...
    // any plugins here will run as normal
    // ...
    '@fab/plugin-dev-proxy': {
      port: 5000,
      enabled: 'DEV_PROXY_ENABLED'
    },
    // ...
    // these plugins will run as normal if DEV_PROXY_ENABLED isn't specified
    // ...
  },
  settings: {
    // ... other envs here
    live: {
      DEV_PROXY_ENABLED: true
    }
  },
}
```

Then, run `fab serve` in the `live` [environment](https://fab.dev/kb/environments):

```
fab serve --env=live [--proxy-ws=5000]
```

This will mean that your FAB can still be deployed without breaking production.
