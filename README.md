# Publishing Angular Libraries with Nx
How to build a group of interdependent publishable libraries all all namespaced under an NPM organization.
## https://github.com/nayfin/demo-co

## What is Nx?
<a href="https://nx.dev/angular">
  <img width="200px" src="https://miro.medium.com/max/1281/0*44TVT2Pa3jrEkaXJ."/>
</a>

Nx is a fantastic open-source tool for building monorepos built by the Nrwl team. Simplifies generation of Angular, React, and Nest apps and libraries. Find docs [here](https://nx.dev/angular) and video tutorial [here](https://nxplaybook.com/p/nx-workspaces).


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

Nx makes it really easy to create publishable interdependent libraries, this helps us to offer  smaller libraries that focus on a specific set of solutions (form fields, state management, ui features, layout). This keeps our libraries lightweight and prevents end-developers from having to download unused dependencies.

 Additionally, we can even have internal apps that depend directly on the libraries while other apps depend on a package from a registry.

## When should I create a publishable library?

Whenever you want access to the code you're writing outside the context you're writing it in (i.e. CLI project or Nx workspace).

## When should I use an Nx Workspace over something like @ngneat/lib

There are two main reasons to choose a workspace over a CLI generated library system:
- You are using the monorepo to organize projects and libraries and would also like to publish some of those libraries
- You are building interdependent libraries and need to quickly how changes to one library effect the dependent libraries

If you are only wanting to publish a single library, or multiple stand-alone libraries you should check out [@ngneat/lib](https://github.com/ngneat/lib). In addition to generating the publishable library, it generates templates for CODE_OF_CONDUCT.md, CONTRIBUTING.md, ISSUE_TEMPLATE.md, LICENSE.md, PULL_REQUEST_TEMPLATE.md, README.md. It also generates some scripts to help automate release.

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

- Create an NPM Organization [here](https://www.npmjs.com/org/create). This will align with your Nx workspace name name allowing you to "scope" your libraries to one namespace. Do this before creating workspace to ensure that the organization name you want is available.

### 2. Install Dependencies

  `npm install -g @angular/cli`

### 3. Generate Nx Workspace
  Use the npm organization from above as the namespace.

  `npx create-nx-workspace <your-namespace>`
  npx create-nx-workspace test-cli

  Follow prompts:
  - Pick the type of project (angular or angular-nest)
  - Pick style extension (scss is great!)
  - Name default app (`examples` is usually a good bet)

  **NOTE:** Picking project type `angular` or `angular-nest` will create an 'Angular CLI Workspace' that create an `angular.json` file to configure the workspace's `libs` and `apps`. Other project types (blank, react, etc..) create an `nx.json` file to configure its `libs` and `apps`.

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

## 6. Publish another library as a dependency
1. Create library of borders

    `nx g @nrwl/angular:lib borders --publishable --prefix=dco`

2. Add star-border component to library

    `nx g c star-border --project=borders --export`

3. Import borders module in form-fields module
    ```ts
    ...
    import { BordersModule } from '@demo-co/borders';

    @NgModule({
      imports: [
        BordersModule
        ...
      ],
    ```
4. Add details to star-border component

    star-border.component.html

    ```html
    <div class="star-border">
      <ng-content>
      </ng-content>
    </div>
    ```
    some silly styles for star-border.component.scss
    ```scss
    $color: green;

    :host {
      margin: 50px 0;
      position: relative;
      display: block;
      color: $color;
      width: 0px;
      height: 0px;
      border-right: 100px solid transparent;
      border-bottom: 70px solid $color;
      border-left: 100px solid transparent;
      transform: rotate(35deg);
    }
    :host:before {
      border-bottom: 80px solid $color;
      border-left: 30px solid transparent;
      border-right: 30px solid transparent;
      position: absolute;
      height: 0;
      width: 0;
      top: -45px;
      left: -65px;
      display: block;
      content: '';
      transform: rotate(-35deg);
    }

    :host:after {
      position: absolute;
      display: block;
      color: $color;
      top: 3px;
      left: -105px;
      width: 0px;
      height: 0px;
      border-right: 100px solid transparent;
      border-bottom: 70px solid $color;
      border-left: 100px solid transparent;
      transform: rotate(-70deg);
      content: '';
    }
    ::ng-deep {
      .star-border > * {
        width: 98px;
        left: -61px;
        top: 16px;
        position: absolute;
        transform: rotate(-35deg);
        z-index: 40;
      }
    }
    ```



## 7. Automated Release (v1)
  You published the library, awesome! But running all those commands manually was kind of gross. There are tools that can help, but for now there's a release script, `release.sh`, in the `scripts` folder.
  It automates release by:
  - prompting user to input which package is being released
  - ensuring that we're on the master branch
  - prompting user to input version bump type (patch, minor, or major)
  - building, packaging, and publishing the library
  - committing a release commit after publishing

  There are tons of other processes that could be added here (running tests), but it's a good start.

  You can also add an npm run script to `package.json` if you'd an alias.

  ```json
    "scripts": {
      "release": "bash ./scripts/release.sh",
      ...
    }
  ```

  There are a lot of ways to do this, and I am going to cover fancier options and important consideration when releasing interdependent packages in an upcoming talk.

  You can also checkout implementing a CI/CD pipeline with Travis [here](https://medium.com/@alfredo.perez.q/publish-angular-library-documentation-created-with-nx-using-travisci-and-github-pages-27854598239c).

## 7. Development Testbed as Interactive Examples

  One of the most important pieces of a good library, is really good documentation. And if you plan the build and keep organized examples of the features as you build them out, then it's relatively easy to post your testbed as interactive documentation on [StackBlitz](https://stackblitz.com)

  StackBlitz can serve any Angular CLI generated project that is on a public github repo, pretty easily. Unfortunately, our documentation app was generated by Nx and StackBlitz can't serve it. So we have to do a little trickery to get it to work, but it's actually a good exercise as it forces us to user the library like our users are using it.

  ### Steps
  - Organize the development testbed. I recommend each library as a lazy-loaded module with each feature as a routed component under that module. This will give you a place to test each feature, and will translate well as an example when it gets turned into docs.
  - Generate a Angular CLI project, named the same as your documentation app, in a directory next to your nx workspace

    `ng new <your-documentation-app-name>`

  - Copy app from Nx workspace over to CLI project. From root of Nx workspace run:

    `cp -rf ./apps/<docs-app-name>/src/app ./../<docs-app-name>/src`

  #### DOCUMENT THE FOLLOWING STEPS IN README.

  This will probably be your first time using your package outside the context of the Nx workspace, and is a good opportunity to see what any consuming user will have to do to use your library. Make sure you carefully outline what it takes to get started with your library. If you have trouble getting it setup, imagine how hard it will be for anyone else to get started.

  - Add your package as well as any `peerDependencies` to the `package.json` of the CLI generated app.

  - Perform any other required setup (e.g. if you need Angular Material run `ng add @angular/material`).
  - Run documentation project
    `ng serve`
  - Setup repo on github, commit and push changes to it.
  - View it on StackBlitz
    `https://stackblitz.com/github/<your-github-username>/<your-project-name`
  - Add above link to README.md file, now users can see exactly how to implement each feature of your library.

## Notes
- Don't enable Ivy in libraries yet. View Engine (pre-Ivy) libraries are forwards compatible with Ivy apps but the reverse isn't true. Recommendation is to wait until Angular 10 before publishing Ivy libraries. The folks at Angular In Depth have a lot more advice [here](https://indepth.dev/the-angular-ivy-guide-for-library-authors/).

- Update your library's `README.md` file, this will be displayed in on it's npm page. It should help users consuming your package to get started. [Here's](https://medium.com/hackernoon/a-crash-course-on-writing-a-better-readme-d796d1f6b352) a good article on Medium help make it fancy, but at a minimum you'll want to have installation instructions and basic usage.

- If your library consumes any packages (e.g. @angular/material, @angular/forms), be sure to add those packages to the `peerDependencies` in its `package.json` file, this will warn users if they are missing its dependencies.

## Resources
- Alfredo Perez has a great series on publishing libraries with Nx. He even goes into implementing a CI/CD pipeline with Travis [here](https://medium.com/@alfredo.perez.q/publish-angular-library-documentation-created-with-nx-using-travisci-and-github-pages-27854598239c).

- If you'd like some help with your README, [here](https://medium.com/hackernoon/a-crash-course-on-writing-a-better-readme-d796d1f6b352) is a good article on Medium by Adnan Rahić. Checkout [shields.io](www.shields.io) if you'd like to add some badges to your README.

- If you'd like to really dive deep, [here](https://blog.angular.io/how-we-use-angular-at-the-gdf-cd17807a9bd2) is an article from the Angular Blog on building an `update` schematic to automatically fix breaking changes when you make them.

# Part 2

## Automated Release (v2)

  Scripts are good, but what if we had a system where, by adding a little detail to our commits, we can enable some pretty nice things:
  > - Automatically generating CHANGELOGs.
  > - Automatically determining a semantic version bump (based on the types of commits landed).
  > - Communicating the nature of changes to teammates, the public, and other stakeholders.
  > - Triggering build and publish processes.
  > - Making it easier for people to contribute to your projects, by allowing them to explore a more structured commit history.  <br>
  ><cite> [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0-beta.2/#why-use-conventional-commits) </cite>
  ### 1. Let's start with the commits

  - install `commitizen` and `commitlint`, these will help us write more useful commit messages

    `npm i -D @commitlint/cli @commitlint/config-angular @commitlint/config-conventional git-cz`

  - initialize commitizen and prepare repo

    `commitizen init cz-conventional-changelog --save-dev --save-exact`

  - add an npm run script to `package.json`

    ```json
      "scripts": {
        "commit": "git-cz",
        ...
      }
    ```

  - run `npm run commit` and follow prompts, now it's easy to be diligent with our commits and they can become a lot more useful




