import { Direction, MoveResult } from "external/user_pb";

export interface UserPageProps {
    moveUser: (direction: Direction, amount: number) => void;
    isMoving: boolean;
    moveResult?: MoveResult;
}

export interface FormValues {
    amount: number;
    direction: Direction;
}
