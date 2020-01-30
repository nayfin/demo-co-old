# Publishing Angular Libraries with Nx

## What is Nx?
Nx is a fantastic open-source tool for building monorepos. Simplifies generation of Angular, React, and Nest apps and libraries. Find docs [here](https://nx.dev/angular).

## What is an NPM Organization?
We can create an organization through npm and group all our libraries under this organization (e.g. @angular, @ngrx, @nrwl). This indicates to the consuming developer that the same organization created all your great libraries.

## Why create libraries?
Publishing libraries like this allows you to:
  - easily reuse features you’ve built for other apps
  - share your code with anyone interested
  - enables others to contribute back to the project
  - show everyone (developers, companies, future employers) how great you are

## Why use nx and npm organization?
Libraries should be well organized and offer specific set of solutions (form fields, state management, ui features, layout). This keeps our libraries lightweight and prevents end-developers from having to download unused dependencies. Using Nx makes library publishing and deploying a trivial task and groups all libraries under a shared namespace.

## When should I create a publishable library?
Whenever you are about to build something ask: “Will this be useful outside of the implementation I’m building it for?”. Then ask: “Will making it open-source create any security risks for me or those using it?" If it’s useful and safe, build it as a library

## Where?

Built in an Nx workspace deployed as a package on NPM.

## How?

### 1. Create NPM Organization

- Decide on a name for your namespace/organization. It's a good idea to make this short. It can be something non-descriptive (like @datorama), or something descriptive (ngRx) which describes the types of libraries it contains.

- Create an NPM Organization [here](https://www.npmjs.com/org/create).

  This will align with your Angular namespace name allowing you to "scope" your libraries to one namespace.


### 2. Install Dependencies

  `npm install -g @angular/cli`


### 3. Generate Nx Workspace
  Use the npm organization from above as the namespace

  `npx create-nx-workspace <your-namespace-name>`

  Follow prompts
  - Pick the type of project (angular or angular-jest)
  - Pick style extension
  - Name default app (`<your-namespace-name>-docs` is usually a good bet)

### 4. Create Library
  Each library should be focused on one feature (e.g. form-fields, state-management) and named appropriately.

  `ng generate @nrwl/angular:lib <your-library-name> --publishable`

  Don't forget the `--publishable` at the end, it tell nx to add a package.json to the library enabling npm publishing.

- Generate First Library Component

  `ng generate component --project=<your-library-name>`

- Make it do something


### 5. Publish Library Once

- commit changes

  `git commit -m 'Some changes on the master branch :)'`
- set initial version in package.json
- publish it!

  `cd dist/libs/<library-name> && npm pack && npm publish --access public && cd ../../../`


## Resources

Alfredo Perez has a great series on publishing libraries with Nx. He even goes into implementing a CI/CD pipeline with Travis [here](https://medium.com/@alfredo.perez.q/publish-angular-library-documentation-created-with-nx-using-travisci-and-github-pages-27854598239c).




