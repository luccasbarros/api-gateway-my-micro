import { IsEmail, IsMobilePhone, IsString, Matches } from 'class-validator';

export class AuthRegisterDTO {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*d)[a-zA-Zd]{8,}$/, {
    message: 'Invalid password',
  })
  password: string;

  @IsMobilePhone('pt-BR')
  phone: string;
}
