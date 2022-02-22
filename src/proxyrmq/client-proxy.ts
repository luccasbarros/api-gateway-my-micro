import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class ClientProxyWallet {
  getClientProxyInstance(): ClientProxy {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [
          `amqp://user:${process.env.RMQ_CREDENTIAL}@${process.env.RMQ_ACCESS}/walletilia`,
        ],
        queue: 'wallet-test',
      },
    });
  }
}
