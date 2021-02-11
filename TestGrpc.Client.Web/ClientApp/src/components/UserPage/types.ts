import { Direction, MoveResult } from "external/user_pb";

export interface UserPageProps {
    moveUser: (value: FormValues, props?: UserPageProps | null) => Promise<void>;
    isMoving: boolean;
    moveResult?: MoveResult;
}

export interface FormValues {
    amount: number;
    direction: Direction;
}
