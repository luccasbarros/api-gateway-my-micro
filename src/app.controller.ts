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
import { CreateCategoryDTO } from './dtos/create-category.dto';

@Controller('api/v1')
export class AppController {
  private logger = new Logger(AppController.name);

  private clientWalletBackend: ClientProxy;

  constructor() {
    this.clientWalletBackend = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://user:pKEMejd4Jl0G@18.204.207.235:5672/smartranking'],
        queue: 'wallet-backend',
      },
    });
  }

  @Post('category')
  @UsePipes(ValidationPipe)
  async createSomething(@Body() createCategoryDTO: CreateCategoryDTO) {
    return this.clientWalletBackend.emit('create-category', createCategoryDTO);
  }
}
