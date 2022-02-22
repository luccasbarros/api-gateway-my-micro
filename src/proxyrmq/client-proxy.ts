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
        urls: [`amqp://user:pKEMejd4Jl0G@18.204.207.235:5672/walletilia`],
        queue: 'wallet-test',
      },
    });
  }
}
