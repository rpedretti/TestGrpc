import { Action } from 'redux';
import { Direction, MoveResult } from 'external/user_pb';

export const MOVE_USER_ACTION = 'MOVE_USER_ACTION';
export const SET_USER_MOVING_ACTION = 'SET_USER_MOVING_ACTION';
export const SET_USER_MOVE_RESULT_ACTION = 'SET_USER_MOVE_RESULT_ACTION';

export interface MoveUserAction extends Action<typeof MOVE_USER_ACTION> {
    payload: {
        direction: Direction;
        amount: number;
    };
}

export interface SetUserMovingAction extends Action<typeof SET_USER_MOVING_ACTION> {
    payload: { isMoving: boolean };
}

export interface SetUserMoveResultAction extends Action<typeof SET_USER_MOVE_RESULT_ACTION> {
    payload: { moveResult: MoveResult };
}

const moveUser = (direction: Direction, amount: number) => ({
    type: 'MOVE_USER_ACTION',
    payload: { direction, amount },
});

const setUserMoving = (isMoving: boolean) => ({
    type: 'SET_USER_MOVING_ACTION',
    payload: { isMoving },
});

const setUserMoveResult = (moveResult: MoveResult) => ({
    type: 'SET_USER_MOVE_RESULT_ACTION',
    payload: { moveResult },
});

export const actions = {
    moveUser,
    setUserMoving,
    setUserMoveResult,
}

export type ActionTypes = MoveUserAction
| SetUserMovingAction
| SetUserMoveResultAction;
