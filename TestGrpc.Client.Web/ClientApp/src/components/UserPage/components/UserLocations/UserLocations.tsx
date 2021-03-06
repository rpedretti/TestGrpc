import * as React from 'react';
import { Box, Button } from '@material-ui/core';
import { FieldArray } from 'react-final-form-arrays';
import { Location } from '../../types';
import UserLocation from './UserLocation';
import { UserLocationsProps } from './types';

interface AddButtonProps {
    add: ((value: Location) => void);
    disabled: boolean;
}

const AddButton = (props: AddButtonProps) => {
    const { add, disabled } = props;
    const [, setCount] = React.useState(0);

    const handleAdd = React.useCallback(() => {
        setCount(v => {
            const newValue = v + 1;
            add({
                id: -newValue,
                name: `Hello ${newValue}`,
                lat: newValue.toString(),
                long: (-newValue).toString(),
            });
            return newValue;
        })
    }, [add]);

    return (
        <Button
            type="button"
            color="primary"
            variant="contained"
            disabled={disabled}
            onClick={handleAdd}
        >
            Add
        </Button>
    );
};

const AddButtonMemo = React.memo(AddButton);

const UserLocations = (props: UserLocationsProps) => {
    const { maxLocations } = props;

    return (
        <FieldArray<Location> name="user.locations">
            {({ fields }) => (
                <Box display="flex" flexDirection="column">
                    {fields.map((name, index) => {
                        const value = fields.value[index];

                        return (
                            <UserLocation
                                key={value.id}
                                name={name}
                                index={index}
                                deleteFn={fields.remove}
                            />
                        );
                    })}
                    <AddButtonMemo disabled={(fields.length ?? 0) >= maxLocations} add={fields.push} />
                </Box>
            )}
        </FieldArray >
    );
}

UserLocations.defaultProps = {
    maxLocations: 4,
}

export default React.memo(UserLocations);