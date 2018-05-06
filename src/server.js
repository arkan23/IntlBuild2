/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import path from 'path';
import Promise from 'bluebird';
import express from 'express';
import cookieParser from 'cookie-parser';
import requestLanguage from 'express-request-language';
import bodyParser from 'body-parser';
import expressJwt, { UnauthorizedError as Jwt401Error } from 'express-jwt';
import { graphql } from 'graphql';
import expressGraphQL from 'express-graphql';
import jwt from 'jsonwebtoken';
import nodeFetch from 'node-fetch';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { getDataFromTree } from 'react-apollo';
import PrettyError from 'pretty-error';
import { IntlProvider } from 'react-intl';
import { graphiqlExpress } from 'apollo-server-express';
import { createServer } from 'http';

import './serverIntlPolyfill';
import createApolloClient from './core/createApolloClient';
import App from './components/App';
import Html from './components/Html';
import { ErrorPageWithoutStyle } from './routes/error/ErrorPage';
import errorPageStyle from './routes/error/ErrorPage.css';
import createFetch from './createFetch';

import passport from './passport/passport';
// import passport from './passport/passportLoc';
// import passport from './passport/passportJwt';

import addGraphQLSubscriptions from './core/server/subscriptions';

import router from './router';
import models from './data/models';
import schema from './data/schema';
// import assets from './asset-manifest.json'; // eslint-disable-line import/no-unresolved
import chunks from './chunk-manifest.json'; // eslint-disable-line import/no-unresolved
import configureStore from './store/configureStore';
import { setRuntimeVariable } from './actions/runtime';
import { setLocale } from './actions/intl';
import config from './config';
import nodemailer from '../node_modules/nodemailer/lib/nodemailer';

process.on('unhandledRejection', (reason, p) => {
    console.error('Unhandled Rejection at:', p, 'reason:', reason);
    // send entire app down. Process manager will restart it
    process.exit(1);
});

//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

const app = express();

//
// If you are using proxy from external machine, you can set TRUST_PROXY env
// Default is to trust proxy headers only from loopback interface.
// -----------------------------------------------------------------------------
app.set('trust proxy', config.trustProxy);

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(cookieParser());
app.use(
    requestLanguage({
        languages: config.locales,
        queryName: 'lang',
        cookie: {
            name: 'lang',
            options: {
                path: '/',
                maxAge: 3650 * 24 * 3600 * 1000, // 10 years in miliseconds
            },
            url: '/lang/{language}',
        },
    }),
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//
// Authentication
// -----------------------------------------------------------------------------
app.get(
    /\/(?!login)/,
    expressJwt({
        secret: config.auth.jwt.secret,
        credentialsRequired: false,
        getToken: req => req.cookies.id_token,
    }),
    (req, res, next) => {
        /*          console.info("USER DATA!!!!!!!");
	    console.info(req.user); */
        if (!req.user) {
            res.redirect('/login');
        }
        next();
    },
);
// Error handler for express-jwt
app.use((err, req, res, next) => {
    // eslint-disable-line no-unused-vars
    if (err instanceof Jwt401Error) {
        console.error('[express-jwt-error]', req.cookies.id_token);
        // `clearCookie`, otherwise user can't use web-app until cookie expires
        res.clearCookie('id_token');
    }
    next(err);
});

app.use(passport.initialize());

app.post(
    '/login',
    /*    passport.authenticate('local', {
	session: false,
    }), */
    (req, res) => {
        console.info(req.body);
        console.info('Jwt callback worked!!');
        const expiresIn = 60 * 60 * 24 * 180; // 180 days
        const token = jwt.sign(req.body, config.auth.jwt.secret, {
            expiresIn,
        });
        res.cookie('id_token', token, {
            maxAge: 1000 * expiresIn,
            httpOnly: true,
        });
        res.redirect('/');
    },
);
/* app.get(
  '/login/facebook',
  passport.authenticate('facebook', {
    scope: ['email', 'user_location'],
    session: false,
  }),
);
app.get(
  '/login/facebook/return',
  passport.authenticate('facebook', {
    failureRedirect: '/login',
    session: false,
  }),
  (req, res) => {
    const expiresIn = 60 * 60 * 24 * 180; // 180 days
    const token = jwt.sign(req.user, config.auth.jwt.secret, { expiresIn });
    res.cookie('id_token', token, { maxAge: 1000 * expiresIn, httpOnly: true });
    res.redirect('/');
  },
); */

//
// Register API middleware
// -----------------------------------------------------------------------------
// https://github.com/graphql/express-graphql#options
const graphqlMiddleware = expressGraphQL(req => ({
    schema,
    graphiql: __DEV__,
    rootValue: { request: req },
    pretty: __DEV__,
}));

// Add in your graphql endpoint
app.use('/graphql', bodyParser.json(), graphqlMiddleware);

// Enable graphiql with subscriptions
app.use(
    '/graphiql',
    graphiqlExpress({
        endpointURL: '/graphql',
        subscriptionsEndpoint: `ws://localhost:${config.subPort}/subscriptions`,
    }),
);

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------

app.post('/email', async req => {
    // Generate SMTP service account from ethereal.email

    // NB! Store the account object values somewhere if you want
    // to re-use the same account for future mail deliveries
    // Create a SMTP transporter object
    const transporter = nodemailer.createTransport(
        {
            service: 'gmail',
            auth: {
                user: 'arkan23a@gmail.com',
                pass: 'arkan23ataha3173',
            },
        },
        {
            // default message fields

            // sender info
            from: 'BuildCompany <arkan23a@gmail.com>',
            headers: {
                'X-Laziness-level': 1000, // just an example header, no need to use this
            },
        },
    );

    // Message object
    const message = {
        // Comma separated list of recipients
        to: 'Ark <arkan23a@yandex.ru>',

        // Subject of the message
        subject: 'Nodemailer is unicode friendly ✔',

        // plaintext body
        text: 'Hello to myself!',

        // HTML body
        html: `${'<p><b>Hello</b> to myself <img src="cid:note@example.com"/></p>' +
            '<p>Here\'s a nyan cat for you as an embedded attachment:<br/><img src="cid:nyan@example.com"/></p>' +
            '<p>'}${req.body.name}</p><p>${req.body.phone}</p>`,

        // An array of attachments
        attachments: [
            // String attachment
            {
                filename: 'notes.txt',
                content: 'Some notes about this e-mail',
                contentType: 'text/plain', // optional, would be detected from the filename
            },

            // Binary Buffer attachment
            {
                filename: 'image.png',
                content: Buffer.from(
                    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAD/' +
                        '//+l2Z/dAAAAM0lEQVR4nGP4/5/h/1+G/58ZDrAz3D/McH8yw83NDDeNGe4U' +
                        'g9C9zwz3gVLMDA/A6P9/AFGGFyjOXZtQAAAAAElFTkSuQmCC',
                    'base64',
                ),

                cid: 'note@example.com', // should be as unique as possible
            },

            // File Stream attachment
            {
                filename: 'nyan cat ✔.gif',
                path:
                    '/home/ark/Documents/programs/intlBuild2/public/images/nyan.gif',
                cid: 'arkan23a@yandex.ru', // should be as unique as possible
            },
        ],
    };

    transporter.sendMail(message, (error, info) => {
        if (error) {
            console.info('Error occurred');
            console.info(error.message);
            console.info(info);
            return process.exit(1);
        }

        console.info('Message sent successfully!');

        // only needed when using pooled connections
        transporter.close();
        return null;
    });
});

app.get('*', async (req, res, next) => {
    try {
        const css = new Set();

        // Enables critical path CSS rendering
        // https://github.com/kriasoft/isomorphic-style-loader
        const insertCss = (...styles) => {
            // eslint-disable-next-line no-underscore-dangle
            styles.forEach(style => css.add(style._getCss()));
        };

        const apolloClient = createApolloClient({
            schema,
            rootValue: { request: req },
        });

        // Universal HTTP client
        const fetch = createFetch(nodeFetch, {
            baseUrl: config.api.serverUrl,
            cookie: req.headers.cookie,
            apolloClient,
            schema,
            graphql,
        });

        const initialState = {
            user: req.user || null,
        };

        const store = configureStore(initialState, {
            cookie: req.headers.cookie,
            apolloClient,
            fetch,
            // I should not use `history` on server.. but how I do redirection? follow universal-router
            history: null,
        });

        store.dispatch(
            setRuntimeVariable({
                name: 'initialNow',
                value: Date.now(),
            }),
        );

        store.dispatch(
            setRuntimeVariable({
                name: 'availableLocales',
                value: config.locales,
            }),
        );

        const locale = req.language;
        const intl = await store.dispatch(
            setLocale({
                locale,
            }),
        );

        // Global (context) variables that can be easily accessed from any React component
        // https://facebook.github.io/react/docs/context.html
        const context = {
            insertCss,
            fetch,
            // The twins below are wild, be careful!
            pathname: req.path,
            query: req.query,
            // You can access redux through react-redux connect
            store,
            storeSubscription: null,
            // Apollo Client for use with react-apollo
            client: apolloClient,
            // intl instance as it can be get with injectIntl
            intl,
            locale,
        };

        const route = await router.resolve(context);

        if (route.redirect) {
            res.redirect(route.status || 302, route.redirect);
            return;
        }

        const data = { ...route };
        const rootComponent = <App context={context}>{route.component}</App>;
        await getDataFromTree(rootComponent);
        // this is here because of Apollo redux APOLLO_QUERY_STOP action
        await Promise.delay(0);
        data.children = await ReactDOM.renderToString(rootComponent);
        data.styles = [{ id: 'css', cssText: [...css].join('') }];

        const scripts = new Set();
        const addChunk = chunk => {
            if (chunks[chunk]) {
                chunks[chunk].forEach(asset => scripts.add(asset));
            } else if (__DEV__) {
                throw new Error(`Chunk with name '${chunk}' cannot be found`);
            }
        };
        addChunk('client');
        if (route.chunk) addChunk(route.chunk);
        if (route.chunks) route.chunks.forEach(addChunk);
        data.scripts = Array.from(scripts);

        // Furthermore invoked actions will be ignored, client will not receive them!
        if (__DEV__) {
            // eslint-disable-next-line no-console
            console.info('Serializing store...');
        }
        data.app = {
            apiUrl: config.api.clientUrl,
            state: context.store.getState(),
            lang: locale,
            apolloState: context.client.extract(),
        };

        const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);
        res.status(route.status || 200);
        res.send(`<!doctype html>${html}`);
    } catch (err) {
        next(err);
    }
});

//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    const locale = req.language;
    console.error(pe.render(err));
    const html = ReactDOM.renderToStaticMarkup(
        <Html
            title="Internal Server Error"
            description={err.message}
            styles={[
                {
                    id: 'css',
                    cssText: errorPageStyle._getCss(), // eslint-disable-line no-underscore-dangle
                },
            ]} // eslint-disable-line no-underscore-dangle
            app={{ lang: locale }}
        >
            {ReactDOM.renderToString(
                <IntlProvider locale={locale}>
                    <ErrorPageWithoutStyle error={err} />
                </IntlProvider>,
            )}
        </Html>,
    );
    res.status(err.status || 500);
    res.send(`<!doctype html>${html}`);
});

// Create websocket server
const websocketServer = createServer((_request, response) => {
    response.writeHead(404);
    response.end();
});

// Try to spin up the websocket server with diff port
websocketServer.listen(config.subPort, () => {
    console.info(`Websocket server listening on port ${config.subPort}`);

    addGraphQLSubscriptions(websocketServer);
});

//
// Launch the server
// -----------------------------------------------------------------------------
const promise = models.sync().catch(err => console.error(err.stack));
if (!module.hot) {
    promise.then(() => {
        app.listen(config.port, () => {
            console.info(
                `The server is running at http://localhost:${config.port}/`,
            );
        });
    });
}

//
// Hot Module Replacement
// -----------------------------------------------------------------------------
if (module.hot) {
    app.hot = module.hot;
    module.hot.dispose(() => {
        try {
            if (websocketServer) {
                websocketServer.close();
            }
        } catch (error) {
            console.error(error.stack);
        }
    });

    module.hot.accept(['./core/server/subscriptions', './router'], () => {
        try {
            addGraphQLSubscriptions(websocketServer);
            console.info('attached addGraphQLSubscriptions to module.hot');
        } catch (error) {
            console.error(error.stack);
        }
    });
}

export default app;
