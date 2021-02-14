import { Change } from "../types";
import { Direction } from "external/user_pb";
import type { ChangeFunction } from "components/Form/types";

type ChangeHandler = ChangeFunction<Change>;

export const handleDirectionSideEffect = (value: Direction, amount: number, change: ChangeHandler): void => {
    if ((value === Direction.BACKWARDS && amount > 0)
        || (value === Direction.FORWARD && amount < 0)) {
        change("user.amount", -amount);
    }
}

export const handleAmountSideEffect = (value: number, previous: number, change: ChangeHandler): void => {
    if (previous >= 0 && value < 0) {
        change("user.direction", Direction.BACKWARDS);
    } else if (previous < 0 && value >= 0) {
        change("user.direction", Direction.FORWARD);
    }
};