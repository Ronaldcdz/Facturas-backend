import { Expose, Type } from 'class-transformer';
import { MiniCiudadDto } from 'src/ciudades/dto/mini-ciudad.dto';

export class ListProvinciaDto {
  @Expose()
  id: number;

  @Expose()
  nombre: string;

  @Expose({ name: 'ciudades' })
  @Type(() => MiniCiudadDto)
  municipios: MiniCiudadDto[];
}
