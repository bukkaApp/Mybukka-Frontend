import React from 'react';
import { Router, Route } from 'react-router-dom';
import { history } from './_helpers'

export class App extends React.Component {
    render() {
        return (
            <Router history={history}>
                <Route render={() => <h1>Welcome to React</h1>} />
            </Router>
            );
    }
}
