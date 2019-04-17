# vly1

[![Join the chat at https://gitter.im/voluntarily/vly1](https://badges.gitter.im/voluntarily/vly1.svg)](https://gitter.im/voluntarily/vly1?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)

Support education and innovation in New Zealand Schools with industry experts and volunteers in the classrooms

# I want to join the Voluntari.ly community
You don't need permission to help - its open. 

This is an open source project and you are welcome to contribute at any level you feel comfortable. 
Find out more about the project at the [Website](http://voluntari.ly) and then...

1. Say hi or ask questions in the gitter chat room above
2. email team@voluntari.ly to tell us about yourself
3. [Start Reading documentation](https://voluntarily.atlassian.net/wiki/spaces/VP/overview)
4. Build the code - below
5. Add yourself to the CONTRIBUTORS file, check it in and send us a pull request - see this ticket [VP-82](https://voluntarily.atlassian.net/browse/VP-82)
6. Come along to a Drop in Wednesday Afternoon or after work social at our [Auckland office](https://goo.gl/maps/fEtq6mdpz446iXVQA)
7. Come along to one of our developer events - see http://voluntari.ly for the latest details.

# Just let me build it

Voluntari.ly is based on the [MERN (MongoDB, Express, React+Redux, Node)](http://mern.io/) software stack and everything should work out of the box. There are two choices: 

1. install NodeJS and MongoDB and run locally.
2. install Docker and run in a container. 

## Install NodeJS and MongoDB and run locally.

### Prerequisites
You will need:
* [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
You may already have it. Verify with `git --version` 

* [nodejs](https://nodejs.org/en/download/). 
Verify this with `node -v` which should return a current version. e.g. v11.12.0

You will also need to be connected to the Internet and be prepared for some downloads. (sometimes corporate firewalls make this difficult - go get a coffee and use theirs.)

* [MongoDB](https://docs.mongodb.com/manual/installation/)
or setup a [free account in the cloud](https://cloud.mongodb.com) - but if you do this you will need to change the `MONGO_URL=mongodb://localhost:27017/vly-test` connection string in your environment or in package.json to point at your cloud URL.
  
For mac users `brew install mongodb` should be all you need to do.

* start the mongodb service

`mongod`

### Get the Voluntari.ly source code

    git clone https://github.com/voluntarily/vly1.git
    cd vly1
    npm install

npm install may take several minutes as it pulls in all the dependent packages. 

### Available Commands

1. `npm start` - starts the development server with hot reloading enabled

2. `npm run bs` - bundles the code and starts the production server

3. `npm run test` - start the test runner

4. `npm run watch:test` - start the test runner with watch mode

5. `npm run cover` - generates test coverage report

6. `npm run lint` - runs linter to check for lint errors

When you run `npm start` it will take a couple of minutes to start up and there's a pause when nothing seems to be happening - be patient, webpack and babel are processing all the files. 
Once you see the message "Voluntari.ly is running on port: 8000! Be Awesome!" then you can open your browser at http://localhost:8000.

If you see the message "Please make sure Mongodb is installed and running!"  then go back and start mongod. 

Press control+C to exit the node application. 

## Install Docker and run in a container.
You can use this option if you quickly want to see what the application looks like.

You will need:
* [Docker](https://docs.docker.com/get-started/)

### Get the source code

    git clone https://github.com/voluntarily/vly1.git
    cd vly1
    npm install

### Start the Containers

    docker-compose up -d --build

Note this may take a few minutes the first time you run it as it will download some images.
Also once the command returns the services are still starting up so it will be a minute before you can visit the webpage.

### You are in.
* Open your web browser at http://localhost:8000/

You will now be able to see the voluntari.ly application (if not then ask for help on our [![gitter](https://badges.gitter.im/voluntarily/vly1.svg)](https://gitter.im/voluntarily/vly1?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) channel.

### Stopping
To halt the containers run:

    docker-compose down 

More information at [Using Docker and Docker Compose](https://voluntarily.atlassian.net/wiki/spaces/VP/pages/9044043/Using+Docker+and+Docker+Compose)



# File Structure

### Webpack Configs

MERN uses Webpack for bundling modules. There are four types of Webpack configs provided `webpack.config.dev.js` (for development), `webpack.config.prod.js` (for production), `webpack.config.server.js` (for bundling server in production) and `webpack.config.babel.js` (for [babel-plugin-webpack-loaders](https://github.com/istarkov/babel-plugin-webpack-loaders) for server rendering of assets included through webpack).

The Webpack configuration is minimal and beginner-friendly. You can customise and add more features to it for production build.

### Server

MERN uses express web framework. Our app sits in server.js where we check for NODE_ENV.

If NODE_ENV is development, we apply Webpack middlewares for bundling and Hot Module Replacement.

#### Server Side Rendering

We use React Router's match function for handling all page requests so that browser history works.

All the routes are defined in `client/routes.js`. React Router renders components according to route requested.

```js
// Server Side Rendering based on routes matched by React-router.
app.use((req, res) => {
    match({
        routes,
        location: req.url
    }, (err, redirectLocation, renderProps) => {
        if (err) {
            return res.status(500).end('Internal server error');
        }

        if (!renderProps) {
            return res.status(404).end('Not found!');
        }

        const initialState = {
            posts: [],
            post: {}
        };

        const store = configureStore(initialState);

        fetchComponentData(store.dispatch, renderProps.components, renderProps.params).then(() => {
            const initialView = renderToString(
                <Provider store = {store} >
                  <RouterContext {...renderProps}/>
                </Provider>
            );

            const finalState = store.getState();

            res.status(200).end(renderFullPage(initialView, finalState));
        }).catch(() => {
            res.end(renderFullPage('Error', {}));
        });
    });
});
```

`match` takes two parameters, first is an object that contains routes, location and history and second is a callback function which is called when routes have been matched to a location.

If there's an error in matching we return 500 status code, if no matches are found we return 404 status code. If a match is found then, we need to create a new Redux Store instance.

**Note:** A new Redux Store has populated afresh on every request.

`fetchComponentData` is the essential function. It takes three params: first is a dispatch function of Redux store, the second is an array of components that should be rendered in current route and third is the route params. `fetchComponentData` collects all the needs (need is an array of actions that are required to be dispatched before rendering the component) of components in the current route. It returns a promise when all the required actions are dispatched. We render the page and send data to the client for client-side rendering in `window.__INITIAL_STATE__`.

### Client

Client directory contains all the shared components, routes, modules.

#### components
This folder contains all the common components which are used throughout the project.

#### index.js
Index.js simply does client side rendering using the data provided from `window.__INITIAL_STATE__`.

#### modules
Modules are the way of organising different domain-specific modules in the project. A typical module contains the following
```
.
└── Post
    ├── __tests__                    // all the tests for this module goes here
    |   ├── components               // Sub components of this module
    |   |   ├── Post.spec.js
    |   |   ├── PostList.spec.js
    |   |   ├── PostItem.spec.js
    |   |   └── PostImage.spec.js
    |   ├── pages
    |   |   ├── PostPage.spec.js
    |   |   └── PostViewPage.spec.js
    |   ├── PostReducer.spec.js
    |   └── PostActions.spec.js
    ├── components                   // Sub components of this module
    |   ├── Post.js
    |   ├── PostList.js
    |   ├── PostItem.js
    |   └── PostImage.js
    ├── pages                        // React Router Pages from this module
    |   ├── PostPage
    |   |   ├── PostPage.js
    |   |   └── PostPage.css
    |   └── PostViewPage
    |       ├── PostViewPage.js
    |       └── PostViewPage.css
    ├── PostReducer.js
    └── PostActions.js
```

## Misc

### Importing Assets
Assets can be kept where you want and can be imported into your js files or css files. Those fill be served by webpack in development mode and copied to the dist folder during production.

### ES6 support
We use babel to transpile code in both server and client with `stage-0` plugin. So, you can use both ES6 and experimental ES7 features.
