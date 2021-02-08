import { MoveResult } from "../../../external/user_pb";
import { ActionTypes } from "./actions";

export interface UserState {
    isMoving: boolean;
    moveResult?: MoveResult;
}

const initialState: UserState = {
    isMoving: false,
    moveResult: undefined
}

export const userReducer = (state = initialState, action: ActionTypes): UserState => {
    switch (action.type) {
        case 'SET_USER_MOVING_ACTION':
            return { ...state, isMoving: action.payload.isMoving }
        case 'SET_USER_MOVE_RESULT_ACTION':
            return { 
                ...state,
                isMoving: false,
                moveResult: action.payload.moveResult
            }
        default:
            return state;
    }
}