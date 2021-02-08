import { UserClient } from '../external/UserServiceClientPb';
import { MoveRequest, Direction, MoveResult } from '../external/user_pb';
import * as grpcWeb from 'grpc-web';

const userClient = new UserClient('https://localhost:5001');

class UserService {

    public async Move(direction: Direction, amount: number): Promise<MoveResult> {
        const request = new MoveRequest();
        request.setDirection(direction);
        request.setAmount(amount);

        try {
            const response = await userClient.move(request, null);
            return response.getResult();
        } catch (e) {
            const error = e as grpcWeb.Error
            if (error.code !== grpcWeb.StatusCode.OK)
            {
                console.error(e);
            }
            throw e;
        }
    }

}

export default new UserService();