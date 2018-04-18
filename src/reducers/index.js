import {combineReducers} from 'redux';
import user from './user';
import runtime from './runtime';
import pageActions from './pageActions';
import pagePolling from './pollingActions';
import intl from './intl';

export default combineReducers({
    user,
    runtime,
    intl,
    pageActions,
    pagePolling,
});
