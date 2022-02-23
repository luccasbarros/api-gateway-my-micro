import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class ClientProxyWallet {
  constructor(private configService: ConfigService) {}

  getClientProxyInstance(): ClientProxy {
    const RMQ_CREDENTIAL = this.configService.get<string>('RMQ_CREDENTIAL');
    const RMQ_ACCESS = this.configService.get<string>('RMQ_ACCESS');
    const RMQ_USER = this.configService.get<string>('RMQ_USER');

    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://${RMQ_USER}:${RMQ_CREDENTIAL}@${RMQ_ACCESS}`],
        queue: 'wallet-test',
      },
    });
  }
}
