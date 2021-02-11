import {
    handleAmountSideEffect,
    handleDirectionSideEffect,
} from '../sideEffects';
import { Direction } from 'external/user_pb';

describe('sideEffects', () => {
    describe('handleAmountSideEffect', () => {
        it('should change direction to FORWARD if value is positive and previous was negative', () => {
            const change = jest.fn();
            handleAmountSideEffect(0, -1, change);

            expect(change).toHaveBeenLastCalledWith("direction", Direction.FORWARD);
        })

        it('should change direction to BACKWARDS if value is negative and previous was positive', () => {
            const change = jest.fn();
            handleAmountSideEffect(-1, 0, change);

            expect(change).toHaveBeenLastCalledWith("direction", Direction.BACKWARDS);
        });

        [
            [1, 2],
            [-1, -2],
        ].forEach(t => it('should not change if no change in sign', () => {
            const change = jest.fn();
            handleAmountSideEffect(t[0], t[1], change);

            expect(change).not.toHaveBeenCalled();
        }));
    });

    describe('handleDirectionSideEffect', () => {
        [
            { direction: Direction.BACKWARDS, value: 1, expected: -1 },
            { direction: Direction.FORWARD, value: -1, expected: 1 },
        ].forEach(t => it('should change amount accordingly', () => {
            const change = jest.fn();
            handleDirectionSideEffect(t.direction, t.value, change);

            expect(change).toHaveBeenCalledTimes(1);
            expect(change).toHaveBeenCalledWith("amount", t.expected);
        }));

    });
});