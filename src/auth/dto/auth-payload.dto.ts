import { IsString } from 'class-validator';

export class AuthPayloadDto {
  @IsString()
  correo: string;

  @IsString()
  contrasenia: string;
}
