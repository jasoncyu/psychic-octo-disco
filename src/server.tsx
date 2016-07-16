const appConfig = require('../config/main');

import * as firebase from './app/redux/modules/firebase/firebase'
import * as e6p from 'es6-promise';
(e6p as any).polyfill();
import 'isomorphic-fetch';

import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import * as ReactRouter from 'react-router';
const RouterContext = ReactRouter.RouterContext as any;

import { Provider } from 'react-redux';
import { createMemoryHistory, match } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
const { ReduxAsyncConnect, loadOnServer } = require('redux-connect');
import { configureStore } from './app/redux/store';
import routes from './app/routes';

import { Html } from './app/containers';
const manifest = require('../build/manifest.json');

const Express = require('express');
const path = require('path');
const compression = require('compression');
const Chalk = require('chalk');
const favicon = require('serve-favicon');
const horizon = require('@horizon/server');

const app = Express();

app.use(compression());
app.use(favicon(path.join(__dirname, '..', 'favicon.ico')));

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack');
  const webpackConfig = require('../config/webpack/dev');
  const webpackCompiler = webpack(webpackConfig);

  app.use(require('webpack-dev-middleware')(webpackCompiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: { colors: true },
    quiet: true,
    noInfo: true,
    hot: true,
    inline: true,
    lazy: false,
    historyApiFallback: true
  }));

  app.use(require('webpack-hot-middleware')(webpackCompiler));
}

app.use(favicon(path.resolve('favicon.ico')));

app.use('/public', Express['static'](path.join(__dirname, '../build/public')));

app.all('/horizon', (req, res, next) => {
  console.log('req.url from /horizon route', req.url)
})

app.get('*', (req, res) => {
  console.log('req.url in * route', req.url)
  const location = req.url;
  const memoryHistory = createMemoryHistory(req.originalUrl);
  const store = configureStore(memoryHistory);
  const history = syncHistoryWithStore(memoryHistory, store);

  match({ history, routes, location },
    (error, redirectLocation, renderProps) => {
      if (error) {
        res.status(500).send(error.message);
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      } else if (renderProps) {
        const asyncRenderData = Object.assign({}, renderProps, { store });

        loadOnServer(asyncRenderData).then(() => {
          const markup = ReactDOMServer.renderToString(
            <Provider store={store} key="provider">
              <ReduxAsyncConnect {...renderProps} />
            </Provider>
          );
          res.status(200).send(renderHTML(markup));
        });

        function renderHTML(markup) {
          const html = ReactDOMServer.renderToString(
            <Html markup={markup} manifest={manifest} store={store} />
          );

          return `<!doctype html> ${html}`;
        }
      } else {
        res.status(404).send('Not Found?');
      }
    });
});

const server = app.listen(appConfig.port, appConfig.host, err => {
  if (err) {
    console.error(Chalk.bgRed(err));
  } else {
    console.info(Chalk.black.bgGreen(
      `\n\n💂  Listening at http://${appConfig.host}:${appConfig.port}\n`
    ));
  }
});

const options = {
  project_name: 'myProject',
  auth: {
    token_secret: 'my_super_secret_secret',
    allow_unauthenticated: true,
  },
  permissions: false,
  auto_create_collection: true,
  auto_create_index: true,
};

const horizonServer = horizon(server, options);
