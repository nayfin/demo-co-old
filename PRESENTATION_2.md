# Part 2

## 1. Publish another library as a dependency
- Create library of borders

    `nx g @nrwl/angular:lib borders --publishable --prefix=dco`

- Disable Ivy in library's `tsconfig.lib.json`

  ```json
  "angularCompilerOptions": {
    "enableIvy": false
  }
  ```

- Add star-border component to library

  `nx g c star-border --project=borders --export`

- Export component from `index.ts`

  ```ts
  export * from './star-border/star-border.ts';
  ```

- Import borders module into `form-fields.module`

    ```ts
    ...
    import { BordersModule } from '@demo-co/borders';

    @NgModule({
      imports: [
        BordersModule
        ...
      ],
    ```
- Add details to star-border component

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
- Use `dco-star-border` in `dco-input`

    dco-input.component.html
    ```html
    <dco-star-border>
      <input type="text">
    </dco-star-border>
    ```

# TODO: MAYBE I DON'T NEED THIS. Learn more about peerDependencies
- In the `form-field` library's `package.json` add the borders library to the `peerDependencies` so that the user knows that they have to install this as a dependency. We will publish it as a package soon.
  ```json
  "peerDependencies": {
    ...
    "@demo-co/borders": "^0.1.0"
  }
  ```

- Release `border` library as a package on NPM. If you your using `release.sh` as a release script, simply add our new library name to our list of library on line 16 of the script
  ```
  packages=(form-fields borders)
  ```
- Release `form-fields` again `npm run release` and follow prompts

- Receive error message
    ```
      Some of the library form-fields's dependencies have not been built yet. Please build these libraries before:
      - borders
    ```
    Nx warns us that we have an unbuilt dependency and tells us how to fix!

- Build `borders` library and then run release scripts

  `nx build borders && npm run release`

  Hot damn! It worked!

- Now lets see what happens in demo-co-docs, our demo app that is using the packaged version of the library, when we try and update

  - update the version in our `package.json` bumping it to the latest version and `npm i`
  - new error!

  ```
    npm ERR! code E404
    npm ERR! 404 Not Found - GET https://registry.npmjs.org/@demo-co%2fborders - Not found
    npm ERR! 404
    npm ERR! 404  '@demo-co/borders@0.0.1' is not in the npm registry.
  ```

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



