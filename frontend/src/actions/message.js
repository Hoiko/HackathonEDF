export const SET_MESSAGE = 'SET_MESSAGE';
export const SET_MESSAGE_SUCCESS = `${SET_MESSAGE}_SUCCESS`;
export const SET_MESSAGE_FAILURE = `${SET_MESSAGE}_FAILURE`;

export const setMessage = () => {
    return {
        type: SET_MESSAGE,
        payload: {
            type: 'GET',
            url: 'https://jsonplaceholder.typicode.com/posts/1',
        },
    };
};
