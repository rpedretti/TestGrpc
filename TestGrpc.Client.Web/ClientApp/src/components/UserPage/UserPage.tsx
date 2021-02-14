import * as React from 'react';
import { Box, Button, Typography, Divider, MenuItem } from '@material-ui/core';
import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays'
import { TextField, Select } from 'mui-rff';
import { FormValues, UserPageProps } from './types';
import UserPageSideEffects from './sideEffects/UserPageSideEffects';
import UserLocations from './components/UserLocations/UserLocations';
import { Direction, MoveResult } from 'external/user_pb';

const parseObj = {
    parse: (v: string): number => Number.parseInt(v, 10),
};

const UserPage = (props: UserPageProps) => {
    const {
        isMoving,
        moveResult,
        moveUser,
    } = props;

    const map = React.useCallback((result?: MoveResult) => {
        if (result !== null && result !== undefined) {
            return result === MoveResult.DONE ? "Moved!" : "Opps, I crasehd"
        }

        return '';
    }, []);

    return (
        <Form<FormValues>
            onSubmit={v => (
                moveUser(v, null)
                    .then<void>()
            )}
            mutators={{
                ...arrayMutators,
            }}
            subscription={{ submitting: true }}
            initialValues={{ user: { amount: 0, direction: Direction.FORWARD, locations: [] } }}
            initialValuesEqual={(a, b) => (
                a?.user.amount === b?.user.amount
                && a?.user.direction === b?.user.direction
            )}
            render={({ handleSubmit, submitting }) => (
                <form onSubmit={handleSubmit}>
                    <UserPageSideEffects />
                    <Box width="100%">
                        <Box display="flex" flexDirection="column">
                            <Box width="100px">
                                <TextField
                                    name="user.amount"
                                    label="Amount:"
                                    data-testid="amount-input"
                                    type="number"
                                    fieldProps={parseObj}
                                />
                            </Box>
                            <Box marginTop="12px" width="100px">
                                <Select
                                    name="user.direction"
                                    id="direction-select"
                                    data-testid="direction-select"
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
                        <Box marginY="12px">
                            <Divider />
                        </Box>
                        <Box marginY="12px">
                            <UserLocations />
                            <Divider />
                        </Box>
                        <Box>
                            <Typography component="p" variant="body1">Result:</Typography>
                            <Typography component="span" variant="body2">{isMoving ? "walking..." : map(moveResult)}</Typography>
                        </Box>
                    </Box>
                </form>
            )}
        />
    );
};

export default React.memo(UserPage);
