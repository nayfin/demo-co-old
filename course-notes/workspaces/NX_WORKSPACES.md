
# Nx Workspace Course Notes
# Getting Started

 `npx create-nx-workspace <your-namespace>`
  npx create-nx-workspace test-cli

  Follow prompts:
  - Pick the type of project (angular or angular-nest)
  - Pick style extension (scss is great!)
  - Name default app (`examples` is usually a good bet)

  **NOTE:** Picking project type `angular` or `angular-nest` will create an 'Angular CLI Workspace' that create an `angular.json` file to configure the workspace's `libs` and `apps`. Other workspace types (blank, react, etc..) use an `nx.json` file to configure its `libs` and `apps`.

<img width="800" src="./gifs/create-nx-workspace.gif">

# Shared Assets Library and nx.json

  All the names below can obviously be changed, but these are good naming conventions to use for the task.
  - create shared assets library

    `nx generate @nwrl/workspace:lib assets --directory=shared`

    nx will add this library to a shared folder or create one if it doesn't exist

    **NOTE:** Notice the use of `@nwrl/workspace:lib` in the generate command. This will create a more generic library, which is good for sharing file assets like this. If you wanted to generate an Angular library you use `@nwrl/angular:lib`.

  - move files you wish to share into `libs/shared/assets/src/lib` (let's say they're png images)
  - update the libraries that need the shared assets
  - update the assets array under the build options for the consuming app in `angular.json`

  ```json
    "architect": {
      "build": {
        "options": {
          "assets": [
            "apps/review/src/favicon.ico",
            // This objects configures how the shared assets are copied over to the consuming app
            {
              "input": "libs/shared/assets/src/lib", // path to assets
              "glob": "*.png", // the type of files to copy
              "output": "assets" // where the assets will be copied to, relative to app root
            }
          ]
        }
      }
    }
  ```
  - the dependency graph cannot detect this dependency because it doesn't use a typescript import
  - so we have to open `nx.json` and for the consuming apps add implicit dependency to the assets lib
  ```json
    "projects": {
      "<dependent-app>": {
        "tags": [],
        "implicitDependencies": ["shared-assets"] //
      },
  ```
  - now it will show up correctly in dependency graph (and I think `nx affected` should watch it for changes)

