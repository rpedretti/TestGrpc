import { Direction } from "external/user_pb";

type ChangeHandler = (name: string, value: any) => void

export const handleDirectionSideEffect = (value: Direction, amount: number, change: ChangeHandler): void => {
    if ((value === Direction.BACKWARDS && amount > 0)
        || (value === Direction.FORWARD && amount < 0)) {
        change("amount", -amount);
    }
}

export const handleAmountSideEffect = (value: number, previous: number, change: ChangeHandler): void => {
    if (previous >= 0 && value < 0) {
        change("direction", Direction.BACKWARDS);
    } else if (previous < 0 && value >= 0) {
        change("direction", Direction.FORWARD);
    }
};