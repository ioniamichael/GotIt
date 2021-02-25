import {combineReducers, createStore, applyMiddleware} from 'redux';
import UserReducer from './reducers/UserReducer';
import thunk from 'redux-thunk';


const rootReducer = combineReducers({
    UserReducer
});

export default createStore(rootReducer, applyMiddleware(thunk));
