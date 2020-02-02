# Publishing Angular Libraries with Nx
How to build a group of publishable libraries all all namespaced under an NPM organization.
## https://github.com/nayfin/demo-co

## What is Nx?
<a href="https://nx.dev/angular">
  <img width="200px" src="https://miro.medium.com/max/1281/0*44TVT2Pa3jrEkaXJ."/>
</a>

Nx is a fantastic open-source tool for building monorepos built by the Nrwl team. Simplifies generation of Angular, React, and Nest apps and libraries. Find docs [here](https://nx.dev/angular).

## What is an NPM Organization?
<a href="https://npmjs.com">
  <img width="200px" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Npm-logo.svg/330px-Npm-logo.svg.png"/>
</a>

We can create an organization through npm and group all our libraries under this organization (e.g. @angular, @ngrx, @nrwl). This indicates to the consuming developer that the same organization created all your great libraries.

## Why create libraries?
![conchords](https://media.giphy.com/media/1iTpx5PpzRugcrZK/giphy.gif)

Publishing libraries like this allows you to:
  - easily reuse features you’ve built for other apps
  - share your code with anyone interested
  - enables others to contribute back to the project
  - show everyone (developers, companies, future employers) how great you are

## Why use nx and npm organization?
Libraries should be well organized and offer specific set of solutions (form fields, state management, ui features, layout). This keeps our libraries lightweight and prevents end-developers from having to download unused dependencies. Using Nx makes library publishing and deploying a trivial task and groups all libraries under a shared namespace.

## When should I create a publishable library?

Whenever you want access to the code you're writing outside the context you're writing it in (i.e. CLI project or Nx workspace).

## Where?

For our purposes, we are deploying to NPM as a public package, but you can easily follow similar steps to deploy to other public or private registries. Consult their docs for information on setup and publishing.

## How do we do all this?
![thinking steven](https://media.giphy.com/media/2xF8ihOYNJCG0iAXNU/giphy.gif)

### 1. Create NPM Organization
- Register for an NPM account if you don't already have one [here](https://www.npmjs.com/signup)

- Sign in through command line

  `npm login`

  Then follow prompts

- Decide on a name for your workspace/organization. It's a good idea to make this short. It can be something non-descriptive (@mango) if you want to have disparate libraries, or something descriptive (@ngstate) if you want to have a group of related libraries.

- Create an NPM Organization [here](https://www.npmjs.com/org/create). This will align with your Nx workspace name name allowing you to "scope" your libraries to one namespace. Do this before creating workspace to ensure that the organization name you want is available

### 2. Install Dependencies

  `npm install -g @angular/cli`


### 3. Generate Nx Workspace
  Use the npm organization from above as the namespace

  `npx create-nx-workspace <your-namespace-name>`

  Follow prompts
  - Pick the type of project (angular or angular-jest)
  - Pick style extension (scss is great!)
  - Name default app (`documentation` is usually a good bet)

### 4. Create Library
  Each library should be focused on one feature (e.g. form-fields, state-management) and named appropriately.

  `ng generate @nrwl/angular:lib <your-library-name> --publishable`

  Don't forget the `--publishable` at the end! It tells nx to do all the extra bits to make publishing easy.

- Generate First Library Component

  `ng generate component --project=<your-library-name>`

- Make it do something!

### 5. Publish Library Once

- commit changes

  `git commit -m 'Some changes on the master branch :)'`
- set initial version in package.json
- build library

  `ng build <library-name>`
- publish it!

  `cd dist/libs/<library-name> && npm pack && npm publish --access public && cd ../../../`

### You published a library!!
![jake prismo 5](https://media.giphy.com/media/V2xbsCrxcLQSQ/giphy.gif)

### Notes:
  - Update your library's `README.md` file, this will be displayed in on it's npm page. It should help consuming users get started using your package. [Here's](https://medium.com/hackernoon/a-crash-course-on-writing-a-better-readme-d796d1f6b352) a good article on Medium to get you started
  - If your library consumes any packages (e.g. @angular/material, @angular/forms), be sure to add those packages to the `peerDependencies` in its `package.json` file.

## 6. Build Release Script
  You published the library, awesome! But running all those commands manually was kind of gross.

  Wouldn't it be great if we could run a script that would:
  - prompts user to input which package is being released
  - checks that we're on the master branch
  - prompts user to input version bump type (patch, minor, or major)
  - builds, packages, and publishes library
  - commits package.json changes as release commit
  - uncomment last line to run documentation scripts after adding them to project

  Take a look at `release.sh` in the `scripts` folder, it is a release script to get you going. There are tons of other processes that could be added here (running tests), but it's a good start.

  You can also use package scripts to alias the bash script in the main workspace `package.json` file.

  ```json
    "scripts": {
      "release": "bash ./scripts/release.sh",
      ...
    }
  ```

  There are a lot of ways to do this (npm script chaining, bash, nps). Find a way that works for you, but try to avoid a long manual process. It will be cumbersome and lead to mistakes.

  You can also checkout implementing a CI/CD pipeline with Travis [here](https://medium.com/@alfredo.perez.q/publish-angular-library-documentation-created-with-nx-using-travisci-and-github-pages-27854598239c).

## 7. Development Testbed as Interactive Examples

  One of the most important pieces of a good library, is really good documentation. And if you plan the build and keep organized examples of the features as you build them out, then it's relatively easy to post your testbed as interactive documentation on [StackBlitz](https://stackblitz.com)

  StackBlitz can serve any Angular CLI generated project that is on a public github repo, pretty easily. Unfortunately, our documentation app was generated by Nx and StackBlitz can't serve it.

  ### Steps
  - Organize the development testbed. I recommend each library as a lazy-loaded module with each feature as a routed component under that module. This will give you a place to test each feature, and will translate well as an example when it gets turned into docs.
  - Generate a Angular CLI project, named the same as your documentation app, in a directory next to your nx workspace

    `ng new <your-documentation-app-name>`

  - Copy app from Nx workspace over to CLI project. From root of Nx workspace run:

    `cp -rf ./apps/<docs-app-name>/src/app ./../<docs-app-name>/src`

  #### DOCUMENT THE FOLLOWINg STEPS IN README.
  This will probably be your first time using your package outside the context of the Nx workspace, and is a good opportunity to see what any consuming user will have to go through to use your library. Make sure you carefully outline what it takes to get started with your library. If you have trouble getting it setup, imagine how hard it will be for anyone else to get started.

  - Add your package as well as any `peerDependencies` to the `package.json` of the CLI generated app.

  - Perform any other required setup (e.g. if you need Angular Material run `ng add @angular/material`).
  - Run documentation project
    `ng serve`
  - Setup repo on github, commit and push changes to it.
  - View it on StackBlitz
    `https://stackblitz.com/github/<your-github-username>/<your-project-name`
  - Add above link to README.md file, now users can see exactly how to implement each feature of your library.

## Notes
- Don't enable Ivy in libraries yet. View Engine (pre-Ivy) libraries are forwards compatible with Ivy apps but the reverse isn't true. Recommendation is to wait until Angular 10 before publishing Ivy libraries. Find lot's more [here](https://indepth.dev/the-angular-ivy-guide-for-library-authors/).

## Resources

- Alfredo Perez has a great series on publishing libraries with Nx. He even goes into implementing a CI/CD pipeline with Travis [here](https://medium.com/@alfredo.perez.q/publish-angular-library-documentation-created-with-nx-using-travisci-and-github-pages-27854598239c).

- If you'd like some help with your README, [here](https://medium.com/hackernoon/a-crash-course-on-writing-a-better-readme-d796d1f6b352) is a good article on Medium by Adnan Rahić. Checkout [shields.io](www.shields.io) if you'd like to add some badges to your README.

- If you'd like to really dive deep, [here](https://blog.angular.io/how-we-use-angular-at-the-gdf-cd17807a9bd2) is an article from the Angular Blog on building an `update` schematic to automatically fix breaking changes when you make them.






