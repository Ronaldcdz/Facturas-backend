import { IsNumber, IsString } from 'class-validator';

export class CreateUsuarioDto {
  @IsNumber()
  id: number;

  @IsString()
  nombre: string;

  @IsString()
  correo: string;

  @IsString()
  contrasenia: string;

  @IsNumber()
  rol: number;
}
