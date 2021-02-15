import * as React from 'react';
import { Box, Button, MenuItem } from '@material-ui/core';
import { Select, TextField } from 'mui-rff';
import { UserMoveProps } from './types';
import { Direction } from 'external/user_pb';

const parseObj = {
    parse: (v: string): number => Number.parseInt(v, 10),
    subscription: { error: true, value: true },
};

const UserMove = (props: UserMoveProps): JSX.Element => {
    const { submitting } = props;
    return (
        <Box display="flex" flexDirection="column">
            <Box width="100px">
                <TextField
                    name="user.amount"
                    label="Amount:"
                    data-testid="amount-input"
                    type="number"
                    disabled={submitting}
                    fieldProps={parseObj}
                />
            </Box>
            <Box marginTop="12px" width="100px">
                <Select
                    name="user.direction"
                    id="direction-select"
                    data-testid="direction-select"
                    disabled={submitting}
                    fieldProps={parseObj}
                >
                    <MenuItem value={Direction.FORWARD}>Forward</MenuItem>
                    <MenuItem value={Direction.BACKWARDS}>Backwards</MenuItem>
                </Select>
            </Box>
            <Box marginTop="16px">
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={submitting}
                >
                    WALK!
                </Button>
            </Box>
        </Box>
    );
}

export default UserMove;
