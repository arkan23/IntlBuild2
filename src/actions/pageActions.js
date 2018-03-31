import { TOGGLE_BUTTON, TOGGLE_MODAL, SAVE_USER } from '../constants';

export function toggleNavbarDisplay(stateValue) {
    return {
        type: TOGGLE_BUTTON,
        payload: !stateValue,
    };
}
export function toggleModalDisplay(stateValue) {
    return {
        type: TOGGLE_MODAL,
        payload: !stateValue,
    };
}
export function saveUserData(userValue, phoneValue) {
    return {
        type: SAVE_USER,
        payload: {
            user: userValue,
            phone: phoneValue,
        },
    };
}
