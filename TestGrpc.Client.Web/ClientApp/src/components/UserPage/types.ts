import type { SubmissionErrors } from "final-form";
import { Direction, MoveResult } from "external/user_pb";
import { FromNullableArray } from "common/types";

export interface UserPageProps {
    moveUser: (value: FormValues, props?: UserPageProps | null) => Promise<SubmissionErrors | void>;
    isMoving: boolean;
    moveResult?: MoveResult;
}

export interface Location {
    name: string;
    lat?: string;
    long?: string;
}

export interface FormValues {
    user: {
        amount: number;
        direction: Direction;
        locations?: Location[];
    },
}

type LocationArray = FromNullableArray<FormValues["user"]["locations"]>;
type OwnsType = Record<`user.owns`, FormValues["user"]["locations"]>
    & Record<`user.locations[${number}]`, LocationArray>
    & Record<`user.locations[${number}].lat`, LocationArray["lat"]>
    & Record<`user.locations[${number}].long`, LocationArray["long"]>
    & Record<`user.locations[${number}].name`, LocationArray["name"]>;

export type Change = {
    "user.amount": FormValues["user"]["amount"];
    "user.direction": FormValues["user"]["direction"];
} & OwnsType
