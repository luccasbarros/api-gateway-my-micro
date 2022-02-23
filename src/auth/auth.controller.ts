import { Body, Controller } from '@nestjs/common';
import { AuthRegisterDTO } from './dtos/auth-register.dto';

@Controller('api/v1/auth')
export class AuthController {
  async register(@Body() authRegisterDTO: AuthRegisterDTO) {}
}
