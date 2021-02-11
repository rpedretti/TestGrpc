import { Action } from 'redux';
import { MoveResult } from 'external/user_pb';
import { createFormAction, FormAction } from 'components/Form/formSagaAction';

export const MOVE_USER_ACTION = 'MOVE_USER_ACTION';
export const SET_USER_MOVING_ACTION = 'SET_USER_MOVING_ACTION';
export const SET_USER_MOVE_RESULT_ACTION = 'SET_USER_MOVE_RESULT_ACTION';

export interface SetUserMovingAction extends Action<typeof SET_USER_MOVING_ACTION> {
    payload: { isMoving: boolean };
}

export interface SetUserMoveResultAction extends Action<typeof SET_USER_MOVE_RESULT_ACTION> {
    payload: { moveResult: MoveResult };
}

const moveUser: FormAction<typeof MOVE_USER_ACTION, any, MoveResult> = createFormAction<typeof MOVE_USER_ACTION, any, MoveResult>(
    MOVE_USER_ACTION
);

const setUserMoving = (isMoving: boolean): SetUserMovingAction => ({
    type: SET_USER_MOVING_ACTION,
    payload: { isMoving },
});

const setUserMoveResult = (moveResult: MoveResult): SetUserMoveResultAction => ({
    type: SET_USER_MOVE_RESULT_ACTION,
    payload: { moveResult },
});

export const actions = {
    moveUser,
    setUserMoving,
    setUserMoveResult,
}

export type ActionTypes =
    | SetUserMovingAction
    | SetUserMoveResultAction;
