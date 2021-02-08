import { Box, Button, Input, InputLabel, Select, MenuItem, Typography, Divider } from '@material-ui/core';
import * as React from 'react';
import { Field, Form } from 'react-final-form';
import { connect } from 'react-redux';
import { Direction, MoveResult } from '../../external/user_pb';
import { actions } from './stateManagement/actions';
import { FormValues, UserPageProps } from './types';
import UserPageSideEffects from './UserPageSideEffects';

const UserPage = (props: UserPageProps) => {
    const {
        isMoving,
        moveResult,
        moveUser,
    } = props;

    const map = React.useCallback((result: MoveResult) => {
        if (result !== null && result !== undefined) {
            return result === MoveResult.DONE ? "Moved!" : "Opps, I crasehd"
        }

        return '';
    }, []);

    return (
        <Form<FormValues>
            onSubmit={v => {
                moveUser(v.amount, v.direction)
            }}
            subscription={{ pristine: true }}
            initialValues={{ amount: 0, direction: Direction.FORWARD }}
            render={({ handleSubmit, pristine }) => (
                <form onSubmit={handleSubmit}>
                    <UserPageSideEffects />
                    <Box width="100%">
                        <Box display="flex" flexDirection="column">
                            <Field<FormValues> name="amount">
                                {props => (
                                    <Box width="100px">
                                        <InputLabel id="amountInput">Amount:</InputLabel>
                                        <Input id="amountInput" {...props.input} type="number" fullWidth={true} />
                                    </Box>
                                )}
                            </Field>
                            <Field<FormValues> name="direction">
                                {props => (
                                    <Box marginTop="8px" width="100px">
                                        <InputLabel id="amountInput">Direction:</InputLabel>
                                        <Select id="directionInput" {...props.input} fullWidth={true}>
                                            <MenuItem value={Direction.FORWARD}>Forward</MenuItem>
                                            <MenuItem value={Direction.BACKWARDS}>Backwards</MenuItem>
                                        </Select>
                                    </Box>
                                )}
                            </Field>
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

const mapSateToProps = (state: any) => {
    return {
        isMoving: state.user.isMoving,
        moveResult: state.user.moveResult,
    }
}

const mapDispatchToProps = {
    moveUser: actions.moveUser,
}

export default connect(mapSateToProps, mapDispatchToProps)(React.memo(UserPage));
