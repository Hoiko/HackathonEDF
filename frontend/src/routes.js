import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import App from './containers/home/HomeContainer';
import About from './containers/about/AboutContainer';

export const routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/about" component={About} />
            </Switch>
        </BrowserRouter>
    );
};

export default routes;
