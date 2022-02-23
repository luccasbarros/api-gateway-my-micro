import { IsEmail, Matches } from 'class-validator';

export class AuthLoginDTO {
  @IsEmail()
  email: string;

  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*d)[a-zA-Zd]{8,}$/, {
    message: 'Invalid password',
  })
  password: string;
}
