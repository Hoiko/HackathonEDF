import { createStore, compose, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';

export const configureStore = (rootReducer, initialState) => {
    const middlewares = applyMiddleware(thunk);

    const devtools = window.devToolsExtension ? window.devToolsExtension() : f => f;
    const store = createStore(rootReducer, initialState, compose(middlewares, devtools));

    return store;
};
