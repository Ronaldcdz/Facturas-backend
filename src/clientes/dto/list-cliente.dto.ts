import { Expose, Transform } from 'class-transformer';
import { Cliente } from '../entities/cliente.entity';

export class ListClienteDto {
  @Expose()
  id: number;

  @Expose()
  nombre: string;

  @Expose()
  rnc: string;

  @Expose()
  @Transform(({ obj }: { obj: Cliente }) => obj.ciudad?.nombre || null)
  ciudad: string;
}
