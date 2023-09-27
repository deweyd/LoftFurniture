import {combineReducers} from "redux";
import {TodoReducer} from './TodoRedusers.jsx'

export const rootReducer = combineReducers({
    todos: TodoReducer
})
