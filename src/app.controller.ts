import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { Observable } from 'rxjs';
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
  createSomething(@Body() createTransactionDTO: CreateTransactionDTO) {
    return this.clientWalletBackend.emit(
      'create-transaction',
      createTransactionDTO,
    );
  }

  @Get('transaction')
  @UsePipes(ValidationPipe)
  listTransactions(@Query('transactionId') id: string): Observable<any> {
    return this.clientWalletBackend.send('list-transactions', id ? id : '');
  }
}
