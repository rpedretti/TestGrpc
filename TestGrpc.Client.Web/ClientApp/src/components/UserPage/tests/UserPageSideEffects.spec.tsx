import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Direction } from '../../../external/user_pb';
import UserPage from '../UserPage';

const handleDirectionSideEffect = jest.fn();
const handleAmountSideEffect = jest.fn(); 

jest.mock('../sideEffects/sideEffects', () => ({
    handleDirectionSideEffect,
    handleAmountSideEffect,
}));

describe('<UserPageSideEffects />', () => {
    it('should call handleAmountSideEffect on amount change', async () => {
        const { getByTestId } = render(<UserPage isMoving={false} moveResult={undefined} moveUser={jest.fn()} />);
        const amountInput = getByTestId("amount-input");
        fireEvent.change(amountInput, { target: { value: '-1' } });

        expect(handleAmountSideEffect)

        // const directionSelect = getByTestId("direction-select") as HTMLInputElement;

        // expect(directionSelect.value).toBe(Direction.BACKWARDS.toString());
    });

    it('should call handleDirectionSideEffect on direction change', () => {
        const { getByTestId } = render(<UserPage isMoving={false} moveResult={undefined} moveUser={jest.fn()} />);
        
        const amountInput = getByTestId("amount-input") as HTMLInputElement;
        fireEvent.change(amountInput, { target : { value: '2' }});

        const directionSelect = getByTestId("direction-select");
        fireEvent.change(directionSelect, { target : { value: Direction.BACKWARDS }});

        expect(amountInput.value).toBe('-2');
    });
});