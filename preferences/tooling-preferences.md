# Tooling preferences

Existing project conventions take priority unless the user specifies otherwise. Preserve its stack, package manager, dependencies, and architecture during routine tasks. The choices below are strong defaults for new projects and decisions the project has not already made; they do not require unrelated scaffolding or migrations.

Where relevant, prefer Node.js for backend code and React for frontend code. Prefer the `mentie` npm package for helpers and utilities. Follow the code style preferences in `js-style.md`.

When setting up linting for a new JavaScript project, prefer the `airier` scaffold. Download and inspect its [quickstart script](https://github.com/actuallymentor/airier/blob/main/quickstart.sh) before running it; use a pinned revision for repeatable setup. Keep existing linting unless a change is requested or necessary for the task.

## Node.js usage

- Use `nvm` for version management, with a supported LTS version in `.nvmrc`; verify the current release when starting a project
- Do not modify files in `node_modules/`, you may view them though
- Prefer Node.js's built-in `.env` loading where supported; configure it explicitly in the launch command rather than assuming files load automatically
- Frontend code should use Vite for bundling
- Backend code should use Node.js
- Prefer JavaScript over TypeScript, including when setting up Vite projects

## React usage

- Frontends should be built in React
- React should be used in frontend mode (no server components)
- Routing is done with `react-router` BrowserRouter
- State is put in the URL where possible using the `use-query-params` npm package
- State that is used in multiple places at once uses `zustand`
- Webapps must be progressive web apps that work offline and auto-update, use `vite-plugin-pwa`. Use the `onNeedRefresh` event to trigger a persistent badge telling the user to reload the page
  - For PWAs add a floating "Install App" pill on the bottom left. When clicked it uses the PWA "add to homescreen" functionality to install the PWA to the device. This pill is hidden if the app is running in PWA mode.
  - PWAs must have both a robust and backwards compatible update system as well as an "Update app" button in the menu that unregisters the app's service worker and reloads the page. Verify updates from a previously installed version; a manual clear cache & hard refresh should never be needed
- Components must follow a structure inspired by Atomic Design where they are split into:
  - Atoms: stateless components
  - Molecules: stateful components (may use Atoms)
  - Pages: components rendered by the router

File structure in a react project:

```bash
.
├── assets
├── package-lock.json
├── package.json
├── public
│   ├── assets
│   ├── favicon.ico
│   ├── logo192.png
│   ├── logo512.png
│   └── robots.txt
├── src
│   ├── App.jsx
│   ├── components
│       ├── atoms
│       │   └── stateless components that do not use other components, e.g. Link.jsx, Text.jsx
│       ├── molecules
│       │  └── stateful components that may use atoms, e.g. Input.jsx, Avatar.jsx
│       └── pages
│           └── components rendered by the router, e.g. HomePage.jsx, ProfilePage.jsx
│   ├── hooks
│   ├── index.css
│   ├── index.jsx
│   ├── modules
│   ├── routes
│   │   └── Routes.jsx
│   └── stores
└── vite.config.js
```

## Using Mentie Helpers

Prefer `mentie` for new projects that need these helpers. Keep an existing project's utilities unless replacement is requested or necessary for the task. When using it, check the installed package's exports and source for available helpers.

Especially important:

- Use `log` which exposes `log.info`, `log.warn`, `log.error`, `log.debug`, `log.insane` for consistent logging. Loglevel is controlled through `LOG_LEVEL` environment variable or `?LOG_LEVEL` in browsers
- Use `cache` as an in-memory cache
- Read `mentie` source code in `node_modules/mentie` when in doubt about its usage

```js
import { log, multiline_trim, shuffle_array } from 'mentie'

log.info( `User logged in:`, user_id )

const query = multiline_trim( `
    SELECT * FROM users
    WHERE active = true
` )

const randomized = shuffle_array( items )
```


### React: preferred libraries:

- `vite` for bundling: https://vitejs.dev/
- `less-lazy` for lazy loading components: https://www.npmjs.com/package/less-lazy
- `styled-components` for styling: https://styled-components.com/
- `react-router` for routing: https://reactrouter.com/
- `zustand` for state management: https://zustand.docs.pmnd.rs/
- `use-query-params` for URL state management: https://www.npmjs.com/package/use-query-params/
- `react-hot-toast` for notifications: https://react-hot-toast.com/
