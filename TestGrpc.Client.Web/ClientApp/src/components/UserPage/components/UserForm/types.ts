import { MoveResult } from 'external/user_pb'
export interface UserFormProps {
    handleSubmit: () => void;
    submitting: boolean;
    isMoving: boolean;
    moveResult?: MoveResult;
}