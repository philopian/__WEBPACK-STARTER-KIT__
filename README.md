# StarterKit

- Dev/Test/Build web application with live-reloading on file save
- Scafold additional react/redux features

## Start Developing

- Get started developing

  ```
    $ npm start -s
  or
    $ yarn start
  ```

## Develop components in isolation with Storybook

- Get started developing

  ```
    $ npm run storybook -s
  or
    $ yarn storybook
  ```

## Test with Jest

- Test your components with Jest
  ```text
    $ npm test -s
  or
    $ yarn test
  ```
- Create code coverage

  ```text
    $ npm run coverage -s
    or
    $ yarn coverage
  ```

## Build for deployment

- Build your application for deployment
  ```
    $ npm run build -s
  or
    $ yarn build
  ```

## Simple CLI to add scafold new features

- Quick way to scafold new react components/containers/reducers

  ```
    $ npm run new component
    $ npm run new container
    $ npm run new reducer
  or
    $ yarn new component
    $ yarn new container
    $ yarn new reducer
  ```

# Additional info

- Didn't want to bundle this up cause people might have their own preferences

  ```text
    $ npm i -g  eslint eslint-config-airbnb-base eslint-config-prettier eslint-plugin-import
  ```

- If you are using VSCode there are some files that are hidden so that the folder structure looks a little cleaner, if you want to show all or some open up the .vscode/settings.json and take a look under the "files.exclude"

- There is a bower.json file if there are some dependencies that can't be found on npm??
