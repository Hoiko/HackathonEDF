import React, { Component } from 'react';
import { Provider } from 'react-redux';

import AppRoutes from '../routes';

type Props = {
    store: Object,
    history: History,
};

export default class App extends Component<Props> {
    props: Props;

    constructor(props: Props) {
        super(props);
    }

    render() {
        const { props: { store } } = this;

        return (
            <Provider {...{ store }}>
                <AppRoutes />
            </Provider>
        );
    }
}
