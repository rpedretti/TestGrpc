import type { FormValues } from "../types";
import { Direction } from "external/user_pb";
import type { ChangeFunction } from "components/Form/types";

type UserFormChange<U = any> = ChangeFunction<FormValues, U>;
type AmountChange = UserFormChange<FormValues["user"]["amount"]>;
type DirectionChange = UserFormChange<FormValues["user"]["direction"]>;

export const handleDirectionSideEffect = (value: Direction, amount: number, change: AmountChange): void => {
    if ((value === Direction.BACKWARDS && amount > 0)
        || (value === Direction.FORWARD && amount < 0)) {
        change("user.amount", -amount);
    }
}

export const handleAmountSideEffect = (value: number, previous: number, change: DirectionChange): void => {
    if (previous >= 0 && value < 0) {
        change("user.direction", Direction.BACKWARDS);
    } else if (previous < 0 && value >= 0) {
        change("user.direction", Direction.FORWARD);
    }
};