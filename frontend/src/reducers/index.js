import { combineReducers } from 'redux';

import message from './messages/messageReducer';

const rootReducer = combineReducers({
    message,
});

export default rootReducer;
