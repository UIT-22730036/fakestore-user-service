import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: process.env.GRPC_URL,
        package: ['grpc.health.v1', 'user.v1'],
        protoPath: [
          join(__dirname, 'infrastructure/grpc/protobuf/health-check.proto'),
          join(__dirname, 'infrastructure/grpc/protobuf/user.proto'),
        ],
      },
    },
  );

  await app.listen();
  Logger.log(`Server is listening on ${process.env.GRPC_URL}`);
}
bootstrap();
