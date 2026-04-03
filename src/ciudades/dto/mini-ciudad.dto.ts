import { Expose } from 'class-transformer';

export class MiniCiudadDto {
  @Expose() id: number;
  @Expose() nombre: string;
}
