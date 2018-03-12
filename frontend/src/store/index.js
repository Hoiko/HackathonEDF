import { createStore, compose, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';
import fetchMiddleware from '../middlewares';

export const configureStore = (rootReducer, initialState) => {
    const middlewares = applyMiddleware(fetchMiddleware, thunk);

    const devtools = window.devToolsExtension ? window.devToolsExtension() : f => f;
    const store = createStore(rootReducer, initialState, compose(middlewares, devtools));

    return store;
};
