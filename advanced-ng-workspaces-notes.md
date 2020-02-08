# Nx Workspace Course Notes

# Shared Assets Library and nx.json

  All the names below can obviously be changed, but these are good naming conventions to use for the task.
  - create shared assets library

    `nx g @nwrl/workspace:lib assets --directory=shared`

    nx will add this library to a shared folder or create one if it doesn't exist

  - move shared files into it (let's say they're png images)
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


# Advanced Nx Workspace Course Notes

# Best Practices
## 1. Folder Structure Conventions

  ### Organizing Libraries
  - small/med monorepo app's libraries should be organized under a directory in libs corresponding to the app that they are used by, with a shared folder to for libraries shared between apps
  - larger apps can group libraries by the feature they support to help keep organized, with a shared folder for libraries that are used across features.

  ### Controling Who Can Approve PRs to Specific Parts of Repo
  - use CODEOWNERS file to control who can approve PRs to master on specific files
  - go to github repo settings -> branches -> add rule -> check require PR before merging and require review from codeowner

## 02. Type Tags
  - nx.json allows us to define tags that define each libraries type (among other things)
  - we can then use these type tags in eslint/tslint files to limit library interdependencies by tag types using the constraints array ()
  - A useful constraint hierarchy might have 5 types (app, feature, ui, data-access, and util). If we want a system where `app`s can depend on [`feature`, `util`], `feature` can depend on [`ui`, `data-access`, `util`], `ui` and `data-access` can depend on [`util`], we would add something like the following under the `rules` object in our tslint/eslint file.
  ```json
  "nx-enforce-module-boundaries": [
      true,
      {
        "allow": ["@nx-example/some/lib/that-all-libs-can-depend-on"],
        "depConstraints": [
          {
            "sourceTag": "type:app",
            "onlyDependOnLibsWithTags": ["type:feature", "type:util"]
          },
          {
            "sourceTag": "type:feature",
            "onlyDependOnLibsWithTags": [
              "type:ui",
              "type:data-access",
              "type:util"
            ]
          },
          {
            "sourceTag": "type:ui",
            "onlyDependOnLibsWithTags": [
              "type:util"
            ]
          },
          {
            "sourceTag": "type:data-access",
            "onlyDependOnLibsWithTags": [
              "type:util"
            ]
          },
        ],
      },
  ```
  - "sourceTag": "*", "onlyDependOnLibsWithTags": ["*"] allows any undefined tag to depend on library
  - use "allow" field to make library globally available regardless of other constraints

## 03. Adding Tags and Constraints
  - you can use other tag types to limit dependencies for other reasons e.g. scope, platform, stability

## 04. Publish a Library
  - create publishable lib with
    `nx g @nrwl/angular:lib <lib-name> --publishable`
  - creates special build task for generated library, now running
    `nx build <library-name>`
    will build esmc5 escm2015 and umd version of the library into dist folder
  - to release cd into library's dist folder and run npm/yarn publish to release

## 05 Trunk Based Development
- trunkbaseddevelopment.com
- master should be the branch shared amongst developers, features are branched from master and PRed back into it.
- releases branches are cut from stable iterations of master
- fixes to releases are made on master and cherry-picked into release


This helps to identify possible conflicts as early as possible, helps everyone have the most up to date code

### In practice
- cut feature branch from master
  `git checkout -b feature-a`
- make changes, committing them to feature branch
- before PR rebase on master
  `git rebase master `
- fix conflicts, then add changes
  `git add .`
- continue rebase
  `git rebase --continue`
- push changes to remote
  `git push`
- submit PR to master

### Safely keeping features that aren't ready for production on master
- add `experimental` tag to libraries that aren't ready for production, then use the constraints field to keep other libraries from depending on them
- use featureFlags to keep unreleased content out of production, following Netanel Basal's [guide](https://netbasal.com/the-ultimate-guide-to-implementing-feature-flags-in-angular-applications-d4ae1fd33684)

# Schematics

## Static Files

# Builders

You can find a list of default tasks (build, serve, lint, extract-i18n, test) for each project in the angular.json or workspace.json, under the `architect` field. Each tasks takes a `builder` and configuration `options`. To run these tasks you run `nx run <project-name>:<task-name>` or use `nx affected --target=<task-name>` to run a task for all affected projects.

## setup first builder
We'll create a `doc` task that will use `compodoc` to build documentation for the project.

- install compodoc as a devDependency
  `npm i -D compodoc`

- `npx compodoc -p libs/form-fields/tsconfig.json -d libs/form-fields/documentation/`

Scripts can be used to accomplish all of this, except that by implementing this way we are able to leverage the `nx affected` command, to run task on all affected projects.

##