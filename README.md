# Monorepo with Nx Vite Vue3 Vuetify Typescript

## Features

[nx](https://nx.dev/) with the plugins:
* [@nx/vite](https://nx.dev/packages/vite)
* [@nxext/vue](https://nxext.dev/docs/vue/installation.html)
* [@nx/cypress](https://nx.dev/packages/cypress)
* [@nx/eslint-plugin](https://nx.dev/packages/eslint-plugin)

Vue.js app
* [Vite](https://vitejs.dev/)
* [Vue.js](https://vuejs.org/)
* [Vue Router](https://router.vuejs.org/)
* [Vuetify](https://vuetifyjs.com/en/)
* [Pinia](https://pinia.vuejs.org/)
* [Material Design Icons](https://pictogrammers.com/library/mdi/)
* [Web Font Loader](https://www.npmjs.com/package/webfontloader)
* TODO: Storybook: https://nx.dev/packages/storybook and https://storybook.js.org/

Testing
* [Vitest](https://vitest.dev/)
* TODO: Cypress for e2e:
  * https://www.cypress.io/ 
  * https://docs.cypress.io/plugins
    * vite
    * with gherkin/cucumber
    * code coverage ?
  * https://marketplace.visualstudio.com/items?itemName=Shelex.vscode-cy-helper

Other

* Typescript
* editorconfig
* eslint
* prettier
* husky - git commit hooks - eslint & prettier
* renovate

## Setup

### Prerequisites

* [VS Code](https://code.visualstudio.com/)
  * This repo includes some recommended extensions and their settings
* npm & npx
* yarn (or your preferred package manager)

### Basic Install

```bash
# install npx globally
npm install -g npx

# create "monorepo-nx-vite-vue3-vuetify-ts" repo with:
# - yarn package manager
# - configure for vite + vue apps
npx create-nx-workspace@latest monorepo-nx-vite-vue3-vuetify-ts --preset=@nxext/vue --pm yarn
# - Enable distributed caching to make your CI faster? No (I don't want to use https://nx.app/)
# - App Name: app

cd monorepo-nx-vite-vue3-vuetify-ts

# add packages for vue
# -W flag installs them at the root level
yarn add -W @mdi/js pinia vue-router vuetify webfontloader
yarn add --dev @types/webfontloader @vitejs/plugin-basic-ssl @vue/tsconfig eslint-plugin-vuetify sass vite-plugin-vuetify

# add packages for testing
yarn add --dev @nx/cypress 
# cypress
# eslint-plugin-cypress

# add other tooling packages
yarn add --dev -W 
# concurrently
# eslint-plugin-prettier
# eslint-plugin-promise
# eslint-plugin-tsdoc
# vite-plugin-checker
```

### Manual Updates

#### [.eslintrc.json](./.eslintrc.json)

Where ever the file glob patterns type typescript files are, add `"*.vue"`:

```json
{
  ...
  "files": ["*.ts", "*.tsx", "*.vue"]
  ...
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
