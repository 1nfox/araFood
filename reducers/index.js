import { combineReducers } from 'redux';
import ReducerUser from './reducer_user';
import ReducerEvents from './reducer_events';

const rootReducer = combineReducers({
    user : ReducerUser,
    events : ReducerEvents
});

export default rootReducer;