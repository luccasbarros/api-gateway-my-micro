import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateTransactionDTO {
  @IsUUID()
  @IsNotEmpty()
  readonly user_id: string;

  @IsString()
  @IsNotEmpty()
  readonly type: string;

  @IsNumber()
  @IsNotEmpty()
  readonly amount: number;
}
