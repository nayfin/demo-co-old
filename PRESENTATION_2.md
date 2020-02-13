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



