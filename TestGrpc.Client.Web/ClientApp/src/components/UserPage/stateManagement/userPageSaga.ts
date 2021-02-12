import { call, ForkEffect, put, takeEvery } from 'redux-saga/effects';
import type { FormValues } from '../types';
import { actions } from './actions';
import UserService from 'services/userService';
import type { FormSagaAction } from 'components/Form/formSagaAction';
import type { PromiseType } from 'common/types';

function* moveUser(action: FormSagaAction<FormValues>) {
    const { direction, amount } = action.payload.values.user;

    yield put(actions.setUserMoving(true));

    type TResponse = PromiseType<ReturnType<typeof UserService.Move>>;

    try {
        const response: TResponse = yield call(UserService.Move, direction, amount);
        yield put(actions.setUserMoveResult(response));

        yield put(actions.moveUser.success(response));
    } catch (error) {
        yield put(actions.setUserMoving(false));
        yield put(actions.moveUser.failure({ error }));
    }
}

export function* userSaga(): Generator<ForkEffect<never>, void, unknown> {
    yield takeEvery(actions.moveUser.REQUEST, moveUser);
}