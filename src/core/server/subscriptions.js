import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';
import schema from '../../data/schema';
// import config from '../../config';

let subscriptionServer;

const addSubscriptions = httpServer => {
        subscriptionServer = SubscriptionServer.create(
                {
                        execute,
                        subscribe,
                        schema,
                        onConnect: connectionParams => ({ connectionParams }),
                },
                {
                        server: httpServer,
                        path: '/subscriptions',
                },
        );
};

const addGraphQLSubscriptions = httpServer => {
        if (module.hot && module.hot.data) {
                const prevServer = module.hot.data.subscriptionServer;
                if (prevServer && prevServer.wsServer) {
                        console.info('Reloading the subscription server.');
                        prevServer.wsServer.close(() => {
                                addSubscriptions(httpServer);
                        });
                }
        } else {
                addSubscriptions(httpServer);
        }
};

if (module.hot) {
        module.hot.dispose(data => {
                try {
                        data.subscriptionServer = subscriptionServer; // eslint-disable-line no-param-reassign
                } catch (error) {
                        console.info(error.stack);
                }
        });
}

export default addGraphQLSubscriptions;
