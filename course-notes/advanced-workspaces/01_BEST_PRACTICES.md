
# Best Practices
## 1. Folder Structure Conventions
  ### Organizing Libraries

  - 'apps' should primarily serve as an injection point for libraries, each app should have a corresponding directory of libraries, subdirectories can be used to further organize an apps libraries
  - small/med monorepo app's libraries should be organized under a directory in libs corresponding to the app that they are used by, with a shared folder to for libraries shared between apps
  - larger apps can group libraries by the feature they support to help keep organized, with a shared folder for libraries that are used across features.

  ### Restricting Who Can Approve PRs to Specific Parts of Repo
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

  `git rebase master`
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
- deploy release branch, development has continued on master

### Safely keeping features that aren't ready for production on master
- add `experimental` tag to libraries that aren't ready for production, then use the constraints field to keep other libraries from depending on them
- use featureFlags to keep unreleased content out of production, following Netanel Basal's [guide](https://netbasal.com/the-ultimate-guide-to-implementing-feature-flags-in-angular-applications-d4ae1fd33684)
