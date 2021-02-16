import * as React from 'react';
import { Box, Button, Card, Grid } from '@material-ui/core';
import { TextField } from 'mui-rff';
import { UserLocationProps } from './types';

const parseObj = {
    parse: (v: string): number | null => (v ? +v : null),
};

const subscription = {
    subscription: { value: true, error: true },
}

const numberProps = {
    ...parseObj,
    ...subscription,
}

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
        <Box clone={true} marginBottom="16px" paddingX="8px" paddingY="12px">
            <Card>
                <Grid container={true} spacing={2}>
                    <Grid item={true} xs={4}>
                        <TextField
                            margin="normal"
                            name={`${name}.name`}
                            label="Name"
                            type="text"
                            fieldProps={subscription}
                        />
                    </Grid>
                    <Grid item={true} xs={4}>
                        <TextField
                            margin="normal"
                            name={`${name}.lat`}
                            label="Latitude"
                            type="number"
                            fieldProps={numberProps}
                        />
                    </Grid>
                    <Grid item={true} xs={4}>
                        <TextField
                            margin="normal"
                            name={`${name}.long`}
                            label="Longitude"
                            type="number"
                            fieldProps={numberProps}
                        />
                    </Grid>
                    <Grid item={true} xs={12}>
                        <Button type="button" onClick={handleDelete} color="secondary" variant="contained">
                            Delete
                            </Button>
                    </Grid>
                </Grid>
            </Card>
        </Box>
    );
};

export default React.memo(UserLocation);
