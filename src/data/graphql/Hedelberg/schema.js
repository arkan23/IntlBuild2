import { merge } from 'lodash';

/** * Subscriptions ** */
import {
        schema as HedelbergData,
        subscription as SubscribeHedelberg,
        resolvers as HedelbergDataResolver,
} from './getDataFromHedelberg';

export const schema = [...HedelbergData];

export const subscription = [...SubscribeHedelberg];

export const resolvers = merge(HedelbergDataResolver);
