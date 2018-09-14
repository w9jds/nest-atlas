import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';

import sagas from './sagas/sagas';

import current from './ducks/current';
import MainLayout from './components/MainLayout';
import { CurrentState } from './models/States';

const sagaMiddleware = createSagaMiddleware();

export interface ApplicationState {
    readonly current: CurrentState;
}

const store = createStore(
    combineReducers<ApplicationState>({
        current
    }),
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(sagas);

render(
    <Provider store={store}>
        <MainLayout />
    </Provider>,
    document.getElementById('root')
);
