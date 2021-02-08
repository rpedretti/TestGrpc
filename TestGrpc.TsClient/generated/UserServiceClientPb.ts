/**
 * @fileoverview gRPC-Web generated client stub for user
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as user_pb from './user_pb';


export class UserClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: any; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'text';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodInfoMove = new grpcWeb.AbstractClientBase.MethodInfo(
    user_pb.MoveResponse,
    (request: user_pb.MoveRequest) => {
      return request.serializeBinary();
    },
    user_pb.MoveResponse.deserializeBinary
  );

  move(
    request: user_pb.MoveRequest,
    metadata: grpcWeb.Metadata | null): Promise<user_pb.MoveResponse>;

  move(
    request: user_pb.MoveRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: user_pb.MoveResponse) => void): grpcWeb.ClientReadableStream<user_pb.MoveResponse>;

  move(
    request: user_pb.MoveRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: user_pb.MoveResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/user.User/Move',
        request,
        metadata || {},
        this.methodInfoMove,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/user.User/Move',
    request,
    metadata || {},
    this.methodInfoMove);
  }

}

