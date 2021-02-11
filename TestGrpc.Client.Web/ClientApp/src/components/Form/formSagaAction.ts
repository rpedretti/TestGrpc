import {
    take,
    takeEvery,
    race,
    put,
    call,
    all,
    AllEffect,
    RaceEffect,
    TakeEffect,
    PutEffect,
    CallEffect,
    ForkEffect,
} from 'redux-saga/effects';
import type { Action } from 'redux';
import type { Dispatch } from 'react';
import store from 'store/configureStore';

type REQUEST = 'REQUEST';
type SUCCESS = 'SUCCESS';
type FAILURE = 'FAILURE';

type ActionType<T = any, P = any> = {
    type: T;
    payload: P;
}

type Actions<TPROPS = any, TREQUEST = any, TRESPONSE = any, TERROR = any> = {
    REQUEST: string;
    SUCCESS: string;
    FAILURE: string;
    request: (data: TREQUEST, props: TPROPS) => ActionType;
    success: (data?: TRESPONSE) => ActionType;
    failure: (error?: TERROR) => ActionType;
}

type ActionLike<T, E, R> = Actions<any, any, R, E> & {
    create: <P>(payload: P) => {
        type: T;
        payload: P;
    }
}

const PROMISE = '@@redux-form-saga/PROMISE';
const status: ['REQUEST', 'SUCCESS', 'FAILURE'] = ['REQUEST', 'SUCCESS', 'FAILURE'];

type FormActionPayload<V, P> = {
    request: {
        type: string;
        payload: {
            values: V;
            props?: P;
        };
    };
    defer: {
        resolve: (value?: any) => void;
        reject: (reason?: any) => void;
    };
    types: [string, string];
}

export type FormAction<T, E, R> = (<V, P>(values: V, props?: P | null) => Promise<any>)
    & ActionLike<T, E, R>;

const formAction = <V, P>(payload: FormActionPayload<V, P>) => ({
    type: PROMISE,
    payload,
});

function createSubAction(requestAction: string, s: REQUEST | SUCCESS | FAILURE): [v1: string, v2: any] {
    const actionType = `${requestAction}_${s}`;
    let subAction: any;

    if (s === 'REQUEST') {
        subAction = <V, P>(values: V, props?: P | null) => ({
            type: actionType,
            payload: {
                values,
                props,
            },
        });
    } else {
        subAction = <V>(values: V) => ({
            type: actionType,
            payload: values,
        });
    }

    return [actionType, subAction];
}

function createFormAction<T extends string, E, R>(requestAction: T): FormAction<T, E, R> {
    const actionMethods: any = {};

    status.forEach((s) => {
        const [actionType, subAction] = createSubAction(requestAction, s);

        // translate specific actionType to generic actionType
        actionMethods[s] = actionType;
        actionMethods[s.toLowerCase() as typeof s] = subAction;
    });

    return Object.assign(<V, P>(values: V, props?: P | null) => new Promise((resolve, reject) => {
        const dispatch = store.dispatch as Dispatch<any>;
        dispatch(formAction({
            request: actionMethods.request(values, props),
            defer: { resolve, reject },
            types: [actionMethods.SUCCESS, actionMethods.FAILURE],
        }));
    }), actionMethods);
}

type RetType = Generator<AllEffect<RaceEffect<TakeEffect> | PutEffect<any>> | Promise<void> | CallEffect<unknown>, void, [any]>;

function* handlePromiseSaga({ payload }: any): RetType {
    const { request, defer, types } = payload;
    const { resolve, reject } = defer;
    const [SUCCESS, FAIL] = types;

    const [winner] = yield all([
        race({
            success: take(SUCCESS),
            fail: take(FAIL),
        }),
        put(request),
    ]);

    if (winner.success) {
        yield call(resolve, winner.success && winner.success.payload ? winner.success.payload : winner.success);
    } else {
        yield call(reject, winner.fail && winner.fail.payload ? winner.fail.payload : winner.fail);
    }
}

function* formActionSaga(): Generator<ForkEffect<never>, void, unknown> {
    yield takeEvery(PROMISE, handlePromiseSaga);
}

type FormSagaAction<V = unknown, P = unknown> = Action<any> & {
    payload: {
        values: V;
        props?: P | null;
    }
};

export {
    createFormAction,
};

export type {
    FormSagaAction,
};

export default formActionSaga;
