import { Expose, Transform } from 'class-transformer';
import { Ciudad } from '../entities/ciudad.entity';

export class ListCiudadDto {
  @Expose()
  id: number;

  @Expose()
  nombre: string;

  @Expose()
  @Transform(({ obj }: { obj: Ciudad }) => obj.provincia?.nombre || null)
  provincia: string;
}
