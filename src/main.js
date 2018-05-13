import React from 'react';
import ReactDOM from 'react-dom';
import createStore from './store/createStore';
import { Provider } from 'react-redux';

import AppContainer from './containers/AppContainer';

const initialState = window.__INITIAL_STATE__;

const store = createStore(initialState);

const MOUNT_NODE = document.getElementById('root');

let render = () => {
    ReactDOM.render(
        <Provider store={store}>
            <AppContainer />
        </Provider>,
        MOUNT_NODE
    )
}

if (__DEV__) {
    if (module.hot) {
        const renderApp = render
        const renderError = (error) => {
            const RedBox = require('redbox-react').default
            ReactDOM.render(<RedBox error={error} />, MOUNT_NODE)
        }
        render = () => {
            try {
                renderApp()
            } catch (error) {
                console.error(error)
                renderError(error)
            }
        }
        module.hot.accept('./routes/index', () =>
            setImmediate(() => {
                ReactDOM.unmountComponentAtNode(MOUNT_NODE)
                render()
            })
        )
    }
}

render()