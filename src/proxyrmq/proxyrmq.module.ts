import { Module } from '@nestjs/common';
import { ClientProxyWallet } from './client-proxy';

@Module({
  providers: [ClientProxyWallet],
  exports: [ClientProxyWallet],
})
export class ProxyRMQModule {}
