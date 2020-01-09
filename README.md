# Action Todos

Action Todos is a reference implementation for a React/Typescript app with a simple state store.

To start the app, clone and `npm start`.

### Features

The design spec is taken from TodoMVC, with the exception of routing. Here we use HTML5 history instead of the url hash.

### State Management

This app is meant to explore an alternative to state management with Redux, with the following differences:

- Actions are functions instead of objects, which cuts down on boilerplate by avoiding the need for Action Creators.
- It's possible to do side effects directly in Actions, cutting down on indirection.

You can see the state management framework [here](src/store.ts).

- To trigger a state change, call a `BoundAction`, and within it call `store.replaceModel()`.
- A model object must never be mutated in place. Always use `safeMerge` or similar.

### Routing

To change the route, update the `pathname` in the model. A subscription to state changes will detect that the `pathname` has been updated and change the browser url accordingly.

### Files & Directory Structure

- `actions` contains functions that respond to events and may replace the model with a new model
- `browser` contains modules that wrap browser API's
- `init` contains modules necessary to bootstrap the app
- `reducers` contains pure functions that accept a model and return an updated model
- `selectors` contains pure functions that accept a model and return derived state
- `test` contains test infrastructure
- `util` contains utility functions that are not specific to this app
- `view` contains React components for rendering the interface
- `store` is the state container
- `model` is the typedef of the app model (state)

### App Shell

The app was bootstrapped with `create-react-app`, and is managed by the `react-scripts` package. Further documentation for `create-react-app` is available [here](https://facebook.github.io/create-react-app/docs/getting-started).

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
