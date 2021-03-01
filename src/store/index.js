import {combineReducers, createStore, applyMiddleware} from 'redux';
import UserReducer from './reducers/UserReducer';
import GeneralReducer from './reducers/GeneralReducer';
import thunk from 'redux-thunk';


const rootReducer = combineReducers({
    UserReducer,
    GeneralReducer,
});

export default createStore(rootReducer, applyMiddleware(thunk));
