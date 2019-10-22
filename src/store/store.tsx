import { createStore, applyMiddleware } from 'redux';
import reducer from '../reducers';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise';

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
