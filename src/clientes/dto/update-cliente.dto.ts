import { PartialType } from '@nestjs/mapped-types';
import { CreateClienteDto } from './create-cliente.dto';
import { IsNumber } from 'class-validator';

export class UpdateClienteDto extends PartialType(CreateClienteDto) {
  @IsNumber()
  id: number;
}
