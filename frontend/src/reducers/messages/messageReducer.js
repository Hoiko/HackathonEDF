import { SET_MESSAGE_SUCCESS } from '../../actions/message';

const initState = {
    message: null,
};

export default (state = initState, action) => {
    switch (action.type) {
        case SET_MESSAGE_SUCCESS:
            return { ...state, message: action.payload.data };
        default:
            return state;
    }
};
