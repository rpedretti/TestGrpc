import { GreeterClient } from '../external/GreetServiceClientPb';
import { HelloRequest } from '../external/greet_pb';
import * as grpcWeb from 'grpc-web';

const greeterClient = new GreeterClient('https://localhost:5001');

class GreeterService {

    public async Greet(name: string): Promise<string> {
        const request = new HelloRequest();
        request.setName(name);

        try {
            const response =  await greeterClient.sayHello(request, null);
            return response.getMessage();
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

export default new GreeterService();