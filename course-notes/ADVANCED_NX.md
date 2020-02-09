TODO:

# Advanced Nx Workspace Course Notes

# Best Practices
## 1. Folder Structure Conventions

  ### Organizing Libraries

  TODO:
  - 'apps' should primarily serve as an injection point for libraries, each app should have a corresponding directory of libraries, subdirectories can be used to further organize an apps libraries
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

### New branching strategy would be something like this
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

### Cut release from master

- `git checkout -b rel@1.*.*`
- hook this into test env pipeline somehow (watch for specific branch name patterns(e.g. 'rel@*.*.*') and run pipeline on matching branches)
- run manual and automated tests
- bugs are submitted to devs
- fixes are made against master then cherrypicked into release branch
- once stable release branch gets

### Safely keeping features that aren't ready for production on master
- add `experimental` tag to libraries that aren't ready for production, then use the constraints field to keep other libraries from depending on them
- use featureFlags to keep unreleased content out of production, following Netanel Basal's [guide](https://netbasal.com/the-ultimate-guide-to-implementing-feature-flags-in-angular-applications-d4ae1fd33684)

# Schematics

## COMING SOON!!!


# Builders

You can find a list of default tasks (build, serve, lint, extract-i18n, test) for each project in the `angular.json` or `workspace.json` (depending on which workspace type you generated), under the `architect` field.

Each tasks takes a `builder` and configuration `options`. To run these tasks you run:

  `nx run <project-name>:<task-name>`

To run a task for all affected projects use:

  `nx affected --target=<task-name>`

**NOTES:** I had to install `@nrwl/cli` globally to get the `nx` command to run as expected:

  `npm i -g @nrwl/cli`

## Create a "doc" task

Let's create a `doc` task that will use [compodoc](https://compodoc.app/) to build documentation for the project. Compodoc is designed to work with an Angular CLI generated workspace but be configured to work well in an Nx workspace as well.

  Here's an example of what the compodoc command would look like if we want generate docs for a `form-fields` library in our workspace:

  `npx compodoc -p libs/form-fields/tsconfig.json -d libs/form-fields/documentation/`

Notice we us the `-d` flag to pass in an output path. If we don't pass in an `output` option, the docs will be generated in a `documentation` directory at the root of the workspace.

### Steps:
- install compodoc as a devDependency

  `npm i -D compodoc`

- add `doc` task to project in `angular.json` (`workspace.json` if you generated an nx workspace).
  ```json
  "<project-name>": {
        ...
        "architect": {
          ...
          "doc": {
            "builder": "@nrwl/workspace:run-commands",
            "options": {
              "commands": [
                {
                  "command": "npx compodoc -p <'libs' | 'apps'>/<project-name>/tsconfig.json -d <'libs' | 'apps'>/<project-name>/documentation/"
                }
              ]
            }
          }
        },
      ...
    }
  ```
- run `nx run <project-name>:doc` to run task
- add task to other projects
- run `nx affect --target=doc` to run `doc` task on all affected projects

Scripts can be used to accomplish all of this, but by implementing it this way we are able to leverage the `nx affected` command. This allows us to run specific task on all affected projects.

##