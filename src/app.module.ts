import { Module } from '@nestjs/common';
import { ProxyRMQModule } from './proxyrmq/proxyrmq.module';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [ProxyRMQModule, TransactionsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
