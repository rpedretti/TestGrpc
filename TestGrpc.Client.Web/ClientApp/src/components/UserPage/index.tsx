import * as React from 'react';
import { connect } from 'react-redux';
import { actions } from './stateManagement/actions';
import UserPage from './UserPage';

const mapSateToProps = (state: any) => {
    return {
        isMoving: state.user.isMoving,
        moveResult: state.user.moveResult,
        moveUser: actions.moveUser,
    }
}
export default connect(mapSateToProps)(React.memo(UserPage));