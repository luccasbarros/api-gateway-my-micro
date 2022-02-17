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
        urls: ['amqp://user:pKEMejd4Jl0G@18.204.207.235:5672/walletilia'],
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
