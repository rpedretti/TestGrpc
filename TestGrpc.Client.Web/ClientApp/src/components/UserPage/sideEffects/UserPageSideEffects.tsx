import * as React from 'react';
import { useForm } from 'react-final-form';
import {
    handleAmountSideEffect,
    handleDirectionSideEffect,
} from './sideEffects'
import { Direction } from 'external/user_pb';
import HandleSideEffect from 'components/Form/HandleSideEffect';
 
const UserPageSideEffects = () => {

    const { change, getState } = useForm();

    const handleDirection = React.useCallback((value: Direction) => {
        const { values } = getState();
        const amount = values.amount;

        handleDirectionSideEffect(value, amount, change);
    }, [change, getState]);

    const handleAmount = React.useCallback((value: number, previous: number) => {
        handleAmountSideEffect(value, previous, change);
    }, [change]);

    return (
        <>
            <HandleSideEffect name="amount" onChange={handleAmount}/>
            <HandleSideEffect name="direction" onChange={handleDirection}/>
        </>
    );
};

export default React.memo(UserPageSideEffects);
