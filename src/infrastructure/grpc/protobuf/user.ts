/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "user.v1";

export interface CreateUserRequest {
  email: string;
  password: string;
  avatar: string;
}

export interface CreateUserResponse {
  response: string;
}

export const USER_V1_PACKAGE_NAME = "user.v1";

/** User service definition. */

export interface UserServiceClient {
  /** Unary RPC to create a new user. */

  createUser(request: CreateUserRequest, metadata?: Metadata): Observable<CreateUserResponse>;
}

/** User service definition. */

export interface UserServiceController {
  /** Unary RPC to create a new user. */

  createUser(
    request: CreateUserRequest,
    metadata?: Metadata,
  ): Promise<CreateUserResponse> | Observable<CreateUserResponse> | CreateUserResponse;
}

export function UserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createUser"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const USER_SERVICE_NAME = "UserService";
