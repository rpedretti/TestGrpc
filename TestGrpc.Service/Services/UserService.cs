using Grpc.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestGrpc.Service
{
    public class UserService : User.UserBase
    {
        public override async Task<MoveResponse> Move(MoveRequest request, ServerCallContext context)
        {
            await Task.Delay(1000);
            return new MoveResponse { 
                Result = request.Amount <= 10 ? MoveResult.Done : MoveResult.Crashed
            };
        }
    }
}
