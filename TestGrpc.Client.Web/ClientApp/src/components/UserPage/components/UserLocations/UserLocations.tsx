import * as React from 'react';
import { Box, Button, Card } from '@material-ui/core';
import { TextField } from 'mui-rff';
import { FieldArray } from 'react-final-form-arrays';
import type { Location } from '../../types';
import type { UserLocationProps } from './types';

const parseObj = {
    parse: (v: string): number => {
        return Number.parseFloat(v)
    },
};

const UserLocation = (props: UserLocationProps) => {
    const {
        index,
        deleteFn,
        name,
    } = props;

    const handleDelete = React.useCallback(() => {
        deleteFn(index);
    }, [index, deleteFn]);

    return (
        <Box clone={true} marginBottom="16px">
            <Card>
                <Box display="flex" flexDirection="column" paddingX="8px" paddingY="12px">
                    <TextField
                        margin="normal"
                        name={`${name}.name`}
                        label="Name"
                        type="text"
                    />

                    <TextField
                        margin="normal"
                        name={`${name}.lat`}
                        label="Latitude"
                        type="text"
                        fieldProps={parseObj}
                    />

                    <TextField
                        margin="normal"
                        name={`${name}.long`}
                        label="Longitude"
                        type="text"
                        fieldProps={parseObj}
                    />
                    <Button type="button" onClick={handleDelete} color="primary" variant="contained">
                        Delete
                    </Button>
                </Box>
            </Card>
        </Box>
    );
}

const UserLocations = () => {
    const [count, setCount] = React.useState(1);

    return (
        <FieldArray<Location> name="user.locations">
            {({ fields }) => (
                <Box display="flex" flexDirection="column">
                    {console.debug(fields)}
                    {fields.map((name, index) => (
                        <UserLocation
                            key={name}
                            name={name}
                            index={index}
                            deleteFn={fields.remove}
                        />
                    ))}
                    <Button
                        type="button"
                        color="primary"
                        variant="contained"
                        onClick={() => {
                            setCount(v => v + 1)
                            fields.push({ name: `Hello ${count}`, lat: count.toString(), long: (-count).toString() })
                        }}
                    >
                        Add
                    </Button>
                </Box>
            )}
        </FieldArray >
    );
}

export default React.memo(UserLocations);