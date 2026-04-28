import { Provincia } from '../../provincias/entities/provincia.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('ciudades')
export class Ciudad {
  @PrimaryColumn()
  id: number;

  @Column({ unique: true, length: 100 })
  nombre: string;

  @Column({ name: 'provincia_id' })
  provinciaId: number;

  @ManyToOne(() => Provincia, (provincia) => provincia.ciudades)
  @JoinColumn({ name: 'provincia_id' })
  provincia: Provincia;
}
