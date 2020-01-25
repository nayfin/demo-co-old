# Publishing Angular Libraries with Nx

## Create NPM Organization

You'll probably end up creating multiple libraries after you create your first one, so it's a good idea namespace your set of libraries under an npm organization (e.g. @angular/core, @angular/router, etc...).

- Decide on a name for your namespace/organization. It's a good idea to make this short. It can be something non-descriptive (like Akita), or something descriptive (ngRx) which describes the types of libraries it contains.

- Create an NPM Organization [here](https://www.npmjs.com/org/create).

  This will align with your Angular namespace name allowing you to "scope" your libraries to one namespace.


- Install Angular CLI

  `npm install -g @angular/cli`


- Generate Nx Workspace, using the npm organization from above as the namespace

  `npx create-nx-workspace <your-namespace-name>`
  - Pick the type of project (angular or angular-jest)
  - Pick style extension
  - Name default app (`<your-namespace-name>-docs` is usually a good bet)

- Generate Library
  Each library should be focused on one feature (e.g. form-fields, state-management) and named appropriately.

  `ng generate @nrwl/angular:lib <your-library-name> --publishable`

  Don't forget the `--publishable` a the end, it tell nx to add a package.json to the library enabling npm publishing.

- Generate First Library Component

  `ng generate component --project=<your-library-name>`

- Make it do something




