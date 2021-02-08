import * as jspb from 'google-protobuf'



export class MoveRequest extends jspb.Message {
  getAmount(): number;
  setAmount(value: number): MoveRequest;

  getDirection(): Direction;
  setDirection(value: Direction): MoveRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MoveRequest.AsObject;
  static toObject(includeInstance: boolean, msg: MoveRequest): MoveRequest.AsObject;
  static serializeBinaryToWriter(message: MoveRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MoveRequest;
  static deserializeBinaryFromReader(message: MoveRequest, reader: jspb.BinaryReader): MoveRequest;
}

export namespace MoveRequest {
  export type AsObject = {
    amount: number;
    direction: Direction;
  }
}

export class MoveResponse extends jspb.Message {
  getResult(): MoveResult;
  setResult(value: MoveResult): MoveResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MoveResponse.AsObject;
  static toObject(includeInstance: boolean, msg: MoveResponse): MoveResponse.AsObject;
  static serializeBinaryToWriter(message: MoveResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MoveResponse;
  static deserializeBinaryFromReader(message: MoveResponse, reader: jspb.BinaryReader): MoveResponse;
}

export namespace MoveResponse {
  export type AsObject = {
    result: MoveResult;
  }
}

export enum Direction { 
  FORWARD = 0,
  BACKWARDS = 1,
}
export enum MoveResult { 
  DONE = 0,
  CRASHED = 1,
}
