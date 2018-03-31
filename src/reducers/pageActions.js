import { TOGGLE_BUTTON, TOGGLE_MODAL, SAVE_USER } from '../constants';

export default function pageActions(
    state = { navState: false, modalState: false, userData: {} },
    action,
) {
    switch (action.type) {
        case TOGGLE_BUTTON:
            return {
                ...state,
                navState: action.payload,
            };
        case TOGGLE_MODAL:
            return {
                ...state,
                modalState: action.payload,
            };
        case SAVE_USER:
            return {
                ...state,
                userData: action.payload,
            };
        default:
            return state;
    }
}
