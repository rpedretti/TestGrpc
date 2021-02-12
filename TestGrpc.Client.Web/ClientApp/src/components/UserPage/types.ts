import type { SubmissionErrors } from "final-form";
import { Direction, MoveResult } from "external/user_pb";

export interface UserPageProps {
    moveUser: (value: FormValues, props?: UserPageProps | null) => Promise<SubmissionErrors | void>;
    isMoving: boolean;
    moveResult?: MoveResult;
}

export interface FormValues {
    user: {
        amount: number;
        direction: Direction;
    },
}
