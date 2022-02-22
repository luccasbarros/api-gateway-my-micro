import { Module } from '@nestjs/common';
import { ProxyRMQModule } from 'src/proxyrmq/proxyrmq.module';
import { TransactionsController } from './transactions.controller';

@Module({
  imports: [ProxyRMQModule],
  controllers: [TransactionsController],
})
export class TransactionsModule {}
