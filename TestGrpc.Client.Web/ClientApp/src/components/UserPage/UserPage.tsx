import { Box, Button, InputLabel, Typography, Divider } from '@material-ui/core';
import * as React from 'react';
import { Field, Form } from 'react-final-form';
import { FormValues, UserPageProps } from './types';
import UserPageSideEffects from './sideEffects/UserPageSideEffects';
import { Direction, MoveResult } from 'external/user_pb';

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
            onSubmit={v => {
                moveUser(v.direction, v.amount)
            }}
            subscription={{ pristine: true }}
            initialValues={{ amount: 0, direction: Direction.FORWARD }}
            render={({ handleSubmit, pristine }) => (
                <form onSubmit={handleSubmit}>
                    <UserPageSideEffects />
                    <Box width="100%">
                        <Box display="flex" flexDirection="column">
                            <Box width="100px">
                                <InputLabel id="amount-input">Amount:</InputLabel>
                                <Field
                                    name="amount" 
                                    id="amount-input"
                                    data-testid="amount-input"
                                    component="input"
                                    type="number"
                                    parse={v => Number.parseInt(v, 10)}
                                />
                            </Box>
                            <Box marginTop="12px" width="100px">
                                <InputLabel id="direction-select">Direction:</InputLabel>
                                <Field
                                    name="direction"
                                    id="direction-select"
                                    data-testid="direction-select"
                                    component="select"
                                    parse={v => Number.parseInt(v, 10)}
                                >
                                    <option value={Direction.FORWARD} label="Forward"/>
                                    <option value={Direction.BACKWARDS} label="Backwards" />
                                </Field>
                            </Box>
                            <Box marginTop="16px">
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    disabled={pristine}
                                >
                                    WALK!
                                </Button>
                            </Box>
                        </Box>
                        <Box marginY="12px">
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
