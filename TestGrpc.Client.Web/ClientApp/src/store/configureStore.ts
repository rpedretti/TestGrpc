import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { userReducer } from '../components/UserPage/stateManagement/reducers';
import { userSaga } from '../components/UserPage/stateManagement/userPageSaga';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore() {
    const middleware = [
        sagaMiddleware
    ];

    const rootReducer = combineReducers({
        user: userReducer,
    });

    const enhancers = [];
    const windowIfDefined = typeof window === 'undefined' ? null : window as any; // eslint-disable-line @typescript-eslint/no-explicit-any
    if (windowIfDefined && windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__) {
        enhancers.push(windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__());
    }

    const store = createStore(
        rootReducer,
        compose(applyMiddleware(...middleware), ...enhancers)
    ); 

    sagaMiddleware.run(userSaga);

    return store;
}
