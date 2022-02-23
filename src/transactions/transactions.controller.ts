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
import { Observable } from 'rxjs';
import { ClientProxyWallet } from 'src/proxyrmq/client-proxy';
import { CreateTransactionDTO } from './dtos/create-transaction.dto';

@Controller('api/v1/')
export class TransactionsController {
  private logger = new Logger(TransactionsController.name);

  constructor(private clientProxy: ClientProxyWallet) {}

  private clientAdminBackend = this.clientProxy.getClientProxyInstance();

  @Post('transaction')
  @UsePipes(ValidationPipe)
  storeTransaction(@Body() createTransactionDTO: CreateTransactionDTO) {
    return this.clientAdminBackend.emit(
      'create-transaction',
      createTransactionDTO,
    );
  }

  @Get('transaction')
  @UsePipes(ValidationPipe)
  listTransactions(@Query('transactionId') id: string): Observable<any> {
    return this.clientAdminBackend.send('list-transactions', id ? id : '');
  }
}
