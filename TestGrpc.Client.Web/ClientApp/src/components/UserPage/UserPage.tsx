import * as React from 'react';
import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays'
import { isEqual } from 'lodash';
import { FormValues, UserPageProps } from './types';
import UserForm from './components/UserForm';
import { Direction } from 'external/user_pb';

const mutators = {
    ...arrayMutators,
}

const subscription = { submitting: true };

const UserPage = (props: UserPageProps) => {
    const {
        moveUser,
    } = props;

    const handleSubmit = React.useCallback((values: FormValues) => (
        moveUser(values, null).then<void>()
    ), [moveUser]);

    return (
        <Form<FormValues>
            onSubmit={handleSubmit}
            mutators={mutators}
            subscription={subscription}
            initialValues={{ user: { amount: 0, direction: Direction.FORWARD, locations: [] } }}
            initialValuesEqual={(a, b) => (
                a?.user.amount === b?.user.amount
                && a?.user.direction === b?.user.direction
                && isEqual(a?.user.locations, b?.user.locations)
            )}
            render={p => <UserForm {...p} />}
        />
    );
};

export default React.memo(UserPage);
