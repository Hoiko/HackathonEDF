import React from 'react';

import { render } from 'react-dom';

import RootContainers from './containers/App';
import rootReducer from './reducers';
import { configureStore } from './store';

const store = configureStore(rootReducer);
const rootElement = document.getElementById('root');

render(<RootContainers {...{ store }} />, rootElement);
