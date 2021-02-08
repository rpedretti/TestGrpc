import { Direction, MoveResult } from "../../external/user_pb";

export interface GreeterPageProps {
    moveUser: (direction: Direction, amount: number) => void;
    isUserMoving: boolean;
    moveResult: MoveResult;
}
