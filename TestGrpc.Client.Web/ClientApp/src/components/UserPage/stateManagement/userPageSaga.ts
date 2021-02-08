import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
    actions,
    MoveUserAction,
    MOVE_USER_ACTION,
} from './actions';
import UserService from 'services/userService';

type PromiseType<T> = T extends PromiseLike<infer U> ? PromiseType<U> : T; 

function *moveUser({ payload: { amount, direction } }: MoveUserAction) {
    yield put(actions.setUserMoving(true));

    type RetType = PromiseType<ReturnType<typeof UserService.Move>>;

    const result: RetType = yield call(UserService.Move, direction, amount);
    
    yield put(actions.setUserMoveResult(result));
}

export function *userSaga() {
    yield all([
        takeEvery(MOVE_USER_ACTION, moveUser),
    ])
}