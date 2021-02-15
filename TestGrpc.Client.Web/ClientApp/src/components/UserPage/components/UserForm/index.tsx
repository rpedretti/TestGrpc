import * as React from 'react';
import { connect } from 'react-redux';
import UserForm from './UserForm';

const mapSateToProps = (state: any) => {
    return {
        isMoving: state.user.isMoving,
        moveResult: state.user.moveResult,
    }
}
export default connect(mapSateToProps)(React.memo(UserForm));