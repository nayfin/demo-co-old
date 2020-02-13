# Part 2

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
5. Use `dco-star-border` in `dco-input`

    dco-input.component.html
    ```html
    <dco-star-border>
      <input type="text">
    </dco-star-border>
    ```

6. Release `form-fields` again `npm run release` and follow prompts

7. Receive error message
    ```
      Some of the library form-fields's dependencies have not been built yet. Please build these libraries before:
      - borders
    ```
    Nx warns us that we have an unbuilt dependency and tells us how to fix!

8. Build `borders` library and then run release scripts

`nx build borders && npm run release`

9. Another error...

  ```
  ERROR: libs/borders/src/lib/star-border/star-border.component.ts:8:14 - error NG3001: Unsupported private class StarBorderComponent. This class is visible to consumers via BordersModule -> StarBorderComponent, but is not exported from the top-level library entrypoint.
  ```

  This is telling us that we need to export our library's entry point so let's do that. Open the library's `index.ts` file and add:

  ```ts
    export * from './star-border/star-border.ts';
  ```

10. Run it again...
  ```
  ERROR: libs/form-fields/src/lib/input/input.component.ts:12:14 - error NG3001: Unsupported private class InputComponent. This class is visible to consumers via FormFieldsModule -> InputComponent, but is not exported from the top-level library entrypoint.
  ```

  Are you serious!!! Okay, we know what to do, just export input component from form-fields library's `index.ts`.

  ```ts
    export * from './input/input.ts';
  ```

  *NOTE:* I upgraded to Angular 9 halfway through writing this. Having to export components directly from the entry point wasn't required in Angular 8.

11. Again: `nx build borders && npm run release`
  ```
  node --eval "console.error('ERROR: Trying to publish a package that has been compiled by Ivy. This is not allowed.\nPlease delete and rebuild the package, without compiling with Ivy, before attempting to publish.\n')" && exit
  ```

  Okay, published libraries aren't supposed to use Ivy yet, but in Angular 9, Ivy is on by default. So let's turn it off for both our libraries since we know we want to publish the `borders` library as well. In both of the library's `tsconfig.lib.json` files, under the `angularCompilerOptions` field add:
  ```json
    "enableIvy": false,
  ```
12. Cross fingers and run again:

  `nx build borders && npm run release`

  Hot damn! It worked!

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



