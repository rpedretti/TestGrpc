import * as React from 'react';
import { Box, Typography, Divider } from '@material-ui/core';
import UserPageSideEffects from '../../sideEffects/UserPageSideEffects';
import UserLocations from '../UserLocations/UserLocations';
import UserMove from '../UserMove';
import { UserFormProps } from './types';
import { MoveResult } from 'external/user_pb';

const UserForm = (props: UserFormProps) => {
    const {
        handleSubmit,
        submitting,
        isMoving,
        moveResult,
    } = props;

    const map = React.useCallback((result?: MoveResult) => {
        if (result !== null && result !== undefined) {
            return result === MoveResult.DONE ? "Moved!" : "Opps, I crasehd"
        }

        return '';
    }, []);

    return (
        <form onSubmit={handleSubmit}>
            <UserPageSideEffects />
            <Box width="50%">
                <UserMove submitting={submitting} />
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
    );
};

export default React.memo(UserForm);