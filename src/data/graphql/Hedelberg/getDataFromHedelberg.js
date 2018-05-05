// import fetch from 'node-fetch';
import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();

export const schema = [
        `
        # Get hedelberg data
        type HedelbergData {
        
            processName: String
            
            date: Int
            
            value: Int
        }
    `,
];

export const subscription = [
        `
        # Get data from hedelberg
        getDataFromHedelberg: HedelbergData
    `,
];

export const resolvers = {
        Subscription: {
                getDataFromHedelberg: {
                        subscribe: () =>
                                pubsub.asyncIterator('getDataFromHedelberg'),
                },
        },
};

/* export const resolvers = {
    Subscription: {
        async getDataFromHedelberg() {
            lastFetchTime = new Date();
            lastFetchTask = fetch('http://localhost:4000/')
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'ok') {
                        items = data.items;
                    }

                    lastFetchTask = null;
                    return items;
                })
                .catch(err => {
                    lastFetchTask = null;
                    throw err;
                });

            if (items.length) {
                return items;
            }

            return lastFetchTask;
        }
    }
}; */
