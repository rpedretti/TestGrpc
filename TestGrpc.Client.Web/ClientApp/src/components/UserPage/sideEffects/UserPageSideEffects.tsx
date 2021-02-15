import * as React from 'react';
import { useForm } from 'react-final-form';
import type { FormValues } from '../types';
import {
    handleAmountSideEffect,
    handleDirectionSideEffect,
} from './sideEffects'
import { Direction } from 'external/user_pb';
import HandleSideEffect from 'components/Form/HandleSideEffect';

const UserPageSideEffects = () => {
    const { change, getState } = useForm<FormValues>();

    const handleDirection = React.useCallback((value: Direction) => {
        const { values } = getState();
        handleDirectionSideEffect(value, values.user.amount, change);
    }, [change, getState]);

    const handleAmount = React.useCallback((value: number, previous: number) => {
        handleAmountSideEffect(value, previous, change);
    }, [change]);

    return (
        <>
            <HandleSideEffect name="user.amount" onChange={handleAmount} />
            <HandleSideEffect name="user.direction" onChange={handleDirection} />
        </>
    );
};

export default React.memo(UserPageSideEffects);
