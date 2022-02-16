import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from 'class-validator';

export interface IEvent {
  name: string;
  operation: string;
  value: number;
}

export class CreateCategoryDTO {
  @IsString()
  @IsNotEmpty()
  readonly category: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @ArrayMinSize(1)
  events: IEvent[];
}
