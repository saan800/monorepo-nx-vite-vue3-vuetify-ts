# Monorepo with Nx, Vite, Vue3, Vuetify, Pinia and Typescript

## Features

Vue.js Apps and Libs

- [Typescript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
  - [Production builds](https://vitejs.dev/guide/why.html#why-bundle-for-production) with tree-shaking, lazy-loading and common chunk splitting
  - Static generated (eg js and css) and imported (eg image names) [filename's are hashed](https://vitejs.dev/guide/assets.html) to avoid caching issues.
- [Vue.js](https://vuejs.org/)
- [Vue Router](https://router.vuejs.org/)
- [Vuetify](https://vuetifyjs.com/en/)
- [Pinia](https://pinia.vuejs.org/)
- [Sass / Scss](https://sass-lang.com/)
- [Material Design Icons](https://pictogrammers.com/library/mdi/)
- [Web Font Loader](https://www.npmjs.com/package/webfontloader)
- TODO: Storybook: https://nx.dev/packages/storybook and https://storybook.js.org/

Testing

- [Vitest](https://vitest.dev/) for unit tests
  - TODO: code coverage
- TODO: Cypress for browser-based tests
  - https://www.cypress.io/
  - https://docs.cypress.io/plugins
    - vite
    - with gherkin/cucumber
    - code coverage ?
  - https://marketplace.visualstudio.com/items?itemName=Shelex.vscode-cy-helper

[Nx](https://nx.dev/) for monorepo management

- [@nx/vite](https://nx.dev/packages/vite)
- [@nxext/vue](https://nxext.dev/docs/vue/installation.html)
- [@nx/cypress](https://nx.dev/packages/cypress)
- [@nx/eslint-plugin](https://nx.dev/packages/eslint-plugin)

Linting and Coding Conventions

- [EditorConfig](https://editorconfig.org/)
- [ESLint](https://eslint.org/)
  - [eslint-config-prettier](https://www.npmjs.com/package/eslint-config-prettier)
  - [eslint-plugin-vue](https://eslint.vuejs.org/)
  - [eslint-plugin-vuetify](https://www.npmjs.com/package/eslint-plugin-vuetify)
  - [rule.sort-imports](https://eslint.org/docs/latest/rules/sort-imports) and [eslint-plugin-import](https://github.com/import-js/eslint-plugin-import) and [eslint-import-resolver-typescript](https://www.npmjs.com/package/eslint-import-resolver-typescript)
    - Keep import statements sorted and organised
  - NOTE: `nx` also has default configuration for typescript in eslint that is used
- [Prettier](https://prettier.io/)
  - [editorconfig = true](https://prettier.io/docs/en/configuration.html#editorconfig): Prettier uses the compatible editorconfig settings, so don't have to configure the same thing in multiple places

CI/CD

- GitHub Actions
  - renovate - auto merge for patch / minor updates

Other

- husky - git commit hooks - currently runs eslint & prettier
- [Visual Studio Code](https://code.visualstudio.com/)
  - Includes recommended extensions and settings for the IDE in this repository. eg
- Spell Checker
  - Uses [.project-words.txt](./.project-words.txt) to add valid words for the repository, on top of whatever language dictionary is configured.
  - Visual Studio Code
    - [Code Spell Checker Extension](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker) is built on top of [CSpell](https://cspell.org/)
    - Has `en` (US) and `en-GB` installed by default, but other [language dictionaries](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker#language-dictionaries) are available
  - TODO: Visual Studio (use the same txt) ??
  - TODO: JetBrains Rider (use the same txt) ??

## Setup

### Prerequisites

- npm and npx
- yarn (or alter the instructions below to use your preferred package manager )

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

yarn add --dev @types/webfontloader @vitejs/plugin-basic-ssl @vue/tsconfig sass vite-plugin-vuetify

# Add packages for testing
yarn add --dev @nx/cypress
# cypress
# eslint-plugin-cypress

# Add other tooling packages
# - linting
yarn add --dev eslint-import-resolver-typescript eslint-plugin-import eslint-plugin-vue eslint-plugin-vuetify
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

#### All Vue apps and libs

###### `vite-env-d.ts`

**IMPORTANT:** Ensure that the `vite-env-d.ts` file is added to the `src` directory.

This will likely need to be done for all new Vue projects/packages.

###### `project.json`

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

#### Check the following files for differences to auto generated

- [.editorconfig](./.editorconfig): Setup [EditorConfig](https://editorconfig.org/) with your preferred code conventions.
- [.eslintrc](./.eslintrc)
  - **NOTE:** @nx/typescript already extends the usual eslint + typescript and prettier plugins
  - Ensure that `"*.vue"` config is setup
- [.prettierrc](./.prettierrc)
  - Add the option `"editorconfig": true` so that Prettier will default to compatible EditorConfig settings. This saves on having to update settings twice for the same thing.
  - Setup [Prettier](https://prettier.io) with your preferred code conventions.
- [vite.config.ts](./apps/my-app/vite.config.ts)
  - Add plugins for SSL, Vuetify
- `tsconfig.***.json` everywhere

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
