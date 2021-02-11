import { applyMiddleware, combineReducers, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
// import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userReducer } from 'components/UserPage/stateManagement/reducers';
import { userSaga } from 'components/UserPage/stateManagement/userPageSaga';
import formActionSaga from 'components/Form/formSagaAction';

const sagaMiddleware = createSagaMiddleware();

const rootReducers = combineReducers({
    user: userReducer,
});

function* rootSaga() {
    yield all([
        userSaga(),
        formActionSaga(),
    ])
}
const middlewares = [sagaMiddleware];
const store = createStore(
    rootReducers,
    composeWithDevTools(
        applyMiddleware(...middlewares),
    ),
);

sagaMiddleware.run(rootSaga);

export default store;
