import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { CreateTransactionDTO } from './dtos/create-transaction.dto';

@Controller('api/v1')
export class AppController {
  private logger = new Logger(AppController.name);

  private clientWalletBackend: ClientProxy;

  constructor() {
    this.clientWalletBackend = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [
          `amqp://user:${process.env.RMQ_CREDENTIAL}@${process.env.RMQ_ACCESS}/walletilia`,
        ],
        queue: 'wallet-test',
      },
    });
  }

  @Post('transaction')
  @UsePipes(ValidationPipe)
  async createSomething(@Body() createTransactionDTO: CreateTransactionDTO) {
    return this.clientWalletBackend.emit(
      'create-transaction',
      createTransactionDTO,
    );
  }
}
