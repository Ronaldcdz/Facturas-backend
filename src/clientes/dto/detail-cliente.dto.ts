import { Expose } from 'class-transformer';
import { ListClienteDto } from './list-cliente.dto';

export class DetailClienteDto extends ListClienteDto {
  @Expose()
  direccion: string;

  @Expose()
  correo: string;

  @Expose()
  telefono: string;
}
