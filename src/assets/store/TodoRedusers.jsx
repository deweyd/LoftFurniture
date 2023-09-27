import {
    DATA_CARD, DATA_ID
} from './actions.jsx';
import data from "../data.jsx";



export function TodoReducer(state = {data, todos1: [],}, action) {
    console.log(action.personId)
    switch (action.type) {
        case DATA_CARD:
            return { ...state, data: data, todos1: [...state.todos1, ...action.todos1]};
        case DATA_ID:
            return { ...state, personId: action.personId };
        default:
            return state;
    }
}


