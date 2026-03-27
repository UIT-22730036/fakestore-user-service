/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "grpc.health.v1";

/**
 * Request message for health check.
 * The service name to check. An empty string represents the overall server health.
 */
export interface HealthCheckRequest {
  service: string;
}

/** Response message containing the health status. */
export interface HealthCheckResponse {
  status: HealthCheckResponse_ServingStatus;
}

/** Possible serving statuses of a service. */
export enum HealthCheckResponse_ServingStatus {
  /** UNKNOWN - The serving status is unknown. */
  UNKNOWN = 0,
  /** SERVING - The service is healthy and ready to serve. */
  SERVING = 1,
  /** NOT_SERVING - The service is not healthy or not ready. */
  NOT_SERVING = 2,
  /** SERVICE_UNKNOWN - The requested service is not registered. */
  SERVICE_UNKNOWN = 3,
  UNRECOGNIZED = -1,
}

export const GRPC_HEALTH_V1_PACKAGE_NAME = "grpc.health.v1";

/** Health checking service definition. */

export interface HealthClient {
  /** Unary RPC to check the current health status of a service. */

  check(request: HealthCheckRequest, metadata?: Metadata): Observable<HealthCheckResponse>;

  /** Server-streaming RPC to watch for health status changes of a service. */

  watch(request: HealthCheckRequest, metadata?: Metadata): Observable<HealthCheckResponse>;
}

/** Health checking service definition. */

export interface HealthController {
  /** Unary RPC to check the current health status of a service. */

  check(
    request: HealthCheckRequest,
    metadata?: Metadata,
  ): Promise<HealthCheckResponse> | Observable<HealthCheckResponse> | HealthCheckResponse;

  /** Server-streaming RPC to watch for health status changes of a service. */

  watch(request: HealthCheckRequest, metadata?: Metadata): Observable<HealthCheckResponse>;
}

export function HealthControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["check", "watch"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("Health", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("Health", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const HEALTH_SERVICE_NAME = "Health";
