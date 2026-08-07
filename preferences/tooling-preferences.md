# Tooling preferences

Where relevant, prefer nodejs for backend code and react for fromtend code. Use the `mentie` npm package for helpers and utilities. Follow the code style preferences in `js-style.md`.

For nodejs and javascript projects, ALWAYS install the `airier` linting scaffold by running this in project root:

```bash
curl -o- https://raw.githubusercontent.com/actuallymentor/airier/main/quickstart.sh | bash
```

## Node.js usage

- Create `nvm` for version management, with the latest LTS (24) in the `.nvmrc`
- Do not modify files in `node_modules/`, you may view them though
- Environment variables are stored in `.env` which is supported by node 24+ without dependencies
- Frontend code should use Vite for bundling
- Backend code should use Node.js
- Prefer javascript over typescript, including when setting up vite projects

## React usage

- Frontends should be built in react
- React should be used in frontend mode (no server components)
- Routing is done with `react-router` BrowserRouter
- State is put in the URL where possible using the `use-query-params` npm package
- State that is used in multiple places at once uses `zustand`
- Webapps must be progressive web apps that work offline and auto-update, use `vite-plugin-pwa`. Use the `onNeedRefresh` event to trigger a persistent badge telling the user to reload the page
  - For PWAs add a floating "Install App" pill on the bottom left. When clicked it uses the PWA "add to homescreen" functionality to install the PWA to the device. This pill is hidden if the app is running in PWA mode.
  - PWA's must have both a robust and backwards comaptible update system as well as a "Update app" button in the menu that forcefully deletes the service worker and reloads the page. You MUST make sure the update mechanism is robust and backwards compatible, a manual clear cache & hard refresh should never be needed
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

Always install the  `mentie` npm package and check `node_modules/mentie/index.js` for available exports.

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
