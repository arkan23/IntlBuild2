import { SAVE_DATA } from '../constants';

export function saveData(data) {
    return {
        type: SAVE_DATA,
        payload: data
    };
}
