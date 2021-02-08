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
            var client = new Greeter.GreeterClient(channel);

            var reply = await client.SayHelloAsync(new HelloRequest { Name = "Rafael" });

            System.Console.WriteLine("Greeting: " + reply.Message);
            System.Console.WriteLine("Press any key to exit...");
            System.Console.ReadKey();
        }
    }
}
