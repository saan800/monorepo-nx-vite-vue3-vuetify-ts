# Monorepo with Nx Vite Vue3 Vuetify Typescript

## Features

[nx](https://nx.dev/) with the plugins:

- [@nx/vite](https://nx.dev/packages/vite)
- [@nxext/vue](https://nxext.dev/docs/vue/installation.html)
- [@nx/cypress](https://nx.dev/packages/cypress)
- [@nx/eslint-plugin](https://nx.dev/packages/eslint-plugin)

Vue.js app

- [Vite](https://vitejs.dev/)
- [Vue.js](https://vuejs.org/)
- [Vue Router](https://router.vuejs.org/)
- [Vuetify](https://vuetifyjs.com/en/)
- [Pinia](https://pinia.vuejs.org/)
- [Material Design Icons](https://pictogrammers.com/library/mdi/)
- [Web Font Loader](https://www.npmjs.com/package/webfontloader)
- TODO: Storybook: https://nx.dev/packages/storybook and https://storybook.js.org/

Testing

- [Vitest](https://vitest.dev/) for unit tests
- TODO: Cypress for e2e tests
  - https://www.cypress.io/
  - https://docs.cypress.io/plugins
    - vite
    - with gherkin/cucumber
    - code coverage ?
  - https://marketplace.visualstudio.com/items?itemName=Shelex.vscode-cy-helper

Other

- Typescript
- editorconfig
- eslint
  - [eslint-plugin-vue](https://eslint.vuejs.org/)
- [Prettier](https://prettier.io/)
- husky - git commit hooks - eslint & prettier
- renovate

## Setup

### Prerequisites

- [VS Code](https://code.visualstudio.com/)
  - This repo includes some recommended extensions and their settings
- npm & npx
- yarn (or your preferred package manager)

### Basic Install

```bash
# Install npx globally
npm install -g npx

# Create "monorepo-nx-vite-vue3-vuetify-ts" repo with:
# - yarn package manager
# - configured for vite + vue apps
npx create-nx-workspace@latest monorepo-nx-vite-vue3-vuetify-ts --preset=@nxext/vue --pm yarn
# - Enable distributed caching to make your CI faster? No (I don't want to use https://nx.app/)
# - App Name: my-app

cd monorepo-nx-vite-vue3-vuetify-ts

# Add packages for vue
# The "-W" flag installs them at the root level
yarn add -W @mdi/js pinia vue-router vuetify webfontloader

yarn add --dev @types/webfontloader @vitejs/plugin-basic-ssl @vue/tsconfig eslint-plugin-vue eslint-plugin-vuetify sass vite-plugin-vuetify

# Add packages for testing
yarn add --dev @nx/cypress
# cypress
# eslint-plugin-cypress

# Add other tooling packages
yarn add --dev eslint-plugin-prettier
# concurrently ?
# eslint-plugin-promise
# eslint-plugin-tsdoc
# vite-plugin-checker
```

### Manual Config Updates

#### [package.json](./package.json)

Ensure the following packages are in `devDependencies` (instead of `dependencies`)

- @nx/.\*
- @nxext/.\*
- vue-tsc

#### [.prettierrc](./.prettierrc)

Setup [Prettier](https://prettier.io) with your preferred code conventions.

#### [.eslintrc.json](./.eslintrc.json)

Add `"*.vue"` file glob pattern to the `overrides.files` section

Update this section to enable `eslint-plugin-vue` for `"*.vue"` files:

```json
{
  "files": ["*.ts", "*.tsx", "*.vue"],
  "extends": [
    "plugin:@nx/typescript", // NOTE: @nx/typescript already extends the usual eslint + typescript and prettier plugins
    "plugin:vue/vue3-recommended"
  ],
  "rules": {
    // Add rules from https://eslint.vuejs.org/rules/
  }
}
```

#### All Vue app `project.json`

Ensure `vue` is added to `"lintFilePatterns"`.

NOTE: This step will need to be done for all new Vue projects/packages.

```json
  "lint": {
    ...
    "options": {
      "lintFilePatterns": ["apps/my-app/**/*.{ts,tsx,vue,js,jsx}"]
    }
  }
```

## Generate code

If you happen to use Nx plugins, you can leverage code generators that might come with it.

Run `nx list` to get a list of available plugins and whether they have generators. Then run `nx list <plugin-name>` to see what generators are available.

Learn more about [Nx generators on the docs](https://nx.dev/plugin-features/use-code-generators).

## Running tasks

To execute tasks with Nx use the following syntax:

```
nx <target> <project> <...options>
```

You can also run multiple targets:

```
nx run-many -t <target1> <target2>
```

..or add `-p` to filter specific projects

```
nx run-many -t <target1> <target2> -p <proj1> <proj2>
```

Targets can be defined in the `package.json` or `projects.json`. Learn more [in the docs](https://nx.dev/core-features/run-tasks).

## Want better Editor Integration?

Have a look at the [Nx Console extensions](https://nx.dev/nx-console). It provides autocomplete support, a UI for exploring and running tasks & generators, and more! Available for VSCode, IntelliJ and comes with a LSP for Vim users.

## Ready to deploy?

Just run `nx build demoapp` to build the application. The build artifacts will be stored in the `dist/` directory, ready to be deployed.

## Set up CI!

Nx comes with local caching already built-in (check your `nx.json`). On CI you might want to go a step further.

- [Set up remote caching](https://nx.dev/core-features/share-your-cache)
- [Set up task distribution across multiple machines](https://nx.dev/core-features/distribute-task-execution)
- [Learn more how to setup CI](https://nx.dev/recipes/ci)

## Connect with us!

- [Join the community](https://nx.dev/community)
- [Subscribe to the Nx Youtube Channel](https://www.youtube.com/@nxdevtools)
- [Follow us on Twitter](https://twitter.com/nxdevtools)
