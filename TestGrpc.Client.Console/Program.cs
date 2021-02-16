using Grpc.Net.Client;
using System;
using System.Threading.Tasks;

namespace TestGrpc.Client.Console
{
    class Program
    {
        static async Task Main(string[] args)
        {
            using var channel = GrpcChannel.ForAddress("https://localhost:5001");
            var client = new User.UserClient(channel);

            var reply = await client.MoveAsync(new MoveRequest { Amount = 11, Direction = Direction.Forward });

            System.Console.WriteLine("Greeting: " + reply.Result);
            System.Console.WriteLine("Press any key to exit...");
            System.Console.ReadKey();
        }
    }
}
