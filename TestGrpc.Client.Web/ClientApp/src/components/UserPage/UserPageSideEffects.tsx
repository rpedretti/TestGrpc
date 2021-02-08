import * as React from 'react';
import { useForm } from 'react-final-form';
import { Direction } from '../../external/user_pb';
import { OnChange } from 'react-final-form-listeners';

const UserPageSideEffects = () => {

    const form = useForm();

    const handleDirection = React.useCallback((value: Direction) => {
        const formState = form.getState();
        const amount = formState.values.amount;

        if ((value === Direction.BACKWARDS && amount > 0)
        || (value === Direction.FORWARD && amount > 0)) {
            form.change("amount", -amount);
        }
    }, [form]);

    const handleAmount = React.useCallback((value: number, previous: number) => {
        if (previous >= 0 && value < 0) {
            form.change("direction", Direction.BACKWARDS);
        } else if (previous < 0 && value >= 0) {
            form.change("direction", Direction.FORWARD);
        }
    }, [form]);

    return (
        <>
            <OnChange name="amount">{handleAmount}</OnChange>
            <OnChange name="direction">{handleDirection}</OnChange>
        </>
    );
};

export default React.memo(UserPageSideEffects);
