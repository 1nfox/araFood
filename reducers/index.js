import { combineReducers } from 'redux';
import ReducerUser from './reducer_user';

const rootReducer = combineReducers({
    user : ReducerUser,
});

export default rootReducer;