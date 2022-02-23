import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientProxyWallet } from './proxyrmq/client-proxy';
import { ProxyRMQModule } from './proxyrmq/proxyrmq.module';
import { TransactionsModule } from './transactions/transactions.module';
import { AuthModule } from './auth/auth.module';
import { AwsModule } from './aws/aws.module';

@Module({
  imports: [
    ProxyRMQModule,
    TransactionsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    AwsModule,
  ],
  controllers: [],
  providers: [ClientProxyWallet],
})
export class AppModule {}
