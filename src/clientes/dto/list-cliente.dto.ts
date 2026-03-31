import { Expose, Type } from 'class-transformer';
import { ListCiudadDto } from 'src/ciudades/dto/list-ciudad.dto';

export class ListClienteDto {
  @Expose()
  id: number;

  @Expose()
  nombre: string;

  @Expose()
  rnc: string;

  @Expose()
  direccion: string;

  @Expose()
  correo: string;

  @Expose()
  telefono: string;

  @Expose()
  @Type(() => ListCiudadDto)
  ciudad: ListCiudadDto;
}
