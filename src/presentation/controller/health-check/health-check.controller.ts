import { Controller } from '@nestjs/common';
import { Observable } from 'rxjs';
import {
  HealthControllerMethods,
  type HealthCheckRequest,
  type HealthCheckResponse,
  type HealthController,
} from 'src/infrastructure/grpc/protobuf/health-check';

@HealthControllerMethods()
export class HealthCheckController implements HealthController {
  check(
    request: HealthCheckRequest,
  ):
    | Promise<HealthCheckResponse>
    | Observable<HealthCheckResponse>
    | HealthCheckResponse {
    console.log('request', request);

    const response: HealthCheckResponse = {
      status: 1, // Assuming the service is healthy (SERVING)
    };
    return response;
  }

  watch(request: HealthCheckRequest): Observable<HealthCheckResponse> {
    return new Observable<HealthCheckResponse>((subscriber) => {
      console.log('watch request', request);

      const response: HealthCheckResponse = {
        status: 1, // Assuming the service is healthy (SERVING)
      };
      subscriber.next(response);
      subscriber.complete();
    });
  }
}
