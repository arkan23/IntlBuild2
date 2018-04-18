import { SAVE_POLLING } from '../constants';

export default function pagePolling(
    state = {},
    action,
) {
    switch (action.type) {
        case SAVE_POLLING:
            return {
                ...state,
                data: action.payload,
            };
        default:
            return state;
    }
}
