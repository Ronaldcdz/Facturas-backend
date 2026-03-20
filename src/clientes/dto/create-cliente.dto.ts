import {
  IsEmail,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateClienteDto {
  @IsString()
  nombre: string;

  @IsNumberString()
  @MinLength(9)
  rnc: string;

  @IsString()
  @IsOptional()
  direccion?: string;

  @IsNumber()
  @IsOptional()
  ciudadId?: number;

  @IsEmail()
  @IsOptional()
  correo?: string;

  @IsNumberString()
  @IsOptional()
  telefono?: string;
}
