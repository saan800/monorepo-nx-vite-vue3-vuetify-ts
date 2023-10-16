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
- TODO: Cypress/playwrite for browser-based tests
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
  - NOTE: `nx` also has default configuration for typescript in eslint that are imported
- [Prettier](https://prettier.io/)
  - [editorconfig = true](https://prettier.io/docs/en/configuration.html#editorconfig): Prettier uses compatible editorconfig settings, so don't have to configure the same rules in multiple places
- [Code Spell Checker (CSpell)](https://cspell.org/)
  - CSpell seems to have a lot of IDE plugins and simple configuration.
  - Use [.cspell.json](./.cspell.json) to add configuration and [.project-dictionary.txt](./.project-dictionary.txt) valid words for the repository, on top of whatever language dictionary is configured.
  - Added `lint:spellcheck` script to [package.json](./package.json) so that can run outside of an IDE.
  - Visual Studio Code: [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
    - Has `en` (US) and `en-GB` installed by default, but other [language dictionaries](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker#language-dictionaries) are available
  - JetBrains Rider: [CSpell Check](https://plugins.jetbrains.com/plugin/20676-cspell-check)

CI/CD

- [GitHub Actions](https://docs.github.com/en/actions)
  - TODO: renovate - auto merge for patch / minor updates

Other

- [Husky](https://typicode.github.io/husky/)
  - Runs prettier, eslint, cspell and unit tests as a [git pre-commit hook](./.husky/pre-commit)
  - Scripts configured to only run staged (ie files that have changes) files for the commit.
- [Visual Studio Code](https://code.visualstudio.com/)
  - Includes recommended [extensions](./.vscode/extensions.json) and [settings](./.vscode/settings.json) for the IDE in this repository.
- [rollup-plugin-visualizer](https://github.com/btd/rollup-plugin-visualizer)
  - Visualize and analyze your build bundles to see which modules are taking up space.
  - Run with `build:stats` and open the generated `bundle-stats.html` in a browser

## Setup

### Prerequisites

- npm and npx
- yarn (or alter the instructions below to use your preferred package manager )

```bash
# Install npx globally
yarn add -g npx
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

Just run `nx build my-app` to build the application. The build artifacts will be stored in the `dist/` directory, ready to be deployed.

## Set up CI!

Nx comes with local caching already built-in (check your `nx.json`). On CI you might want to go a step further.

- [Set up remote caching](https://nx.dev/core-features/share-your-cache)
- [Set up task distribution across multiple machines](https://nx.dev/core-features/distribute-task-execution)
- [Learn more how to setup CI](https://nx.dev/recipes/ci)

## Connect with us!

- [Join the community](https://nx.dev/community)
- [Subscribe to the Nx Youtube Channel](https://www.youtube.com/@nxdevtools)
- [Follow us on Twitter](https://twitter.com/nxdevtools)
