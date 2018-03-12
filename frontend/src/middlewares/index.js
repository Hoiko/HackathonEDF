import FetchAction from './FetchAction';

function fetchMiddleware({ dispatch }) {
    return next => async action => {
        if (action.type) {
            const fetchAction = new FetchAction(action, dispatch);

            if (fetchAction.isValid()) {
                const result = await fetchAction.result();
                dispatch({ ...result });
            } else {
                action.error = true;
                next(action);
            }
        } else {
            next(action);
        }
    };
}

export default fetchMiddleware;
