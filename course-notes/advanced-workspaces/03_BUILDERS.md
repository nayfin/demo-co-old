
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
