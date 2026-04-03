import { Ciudad } from 'src/ciudades/entities/ciudad.entity';
import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';

// En provincia.entity.ts
@Entity('provincias')
export class Provincia {
  @PrimaryColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @OneToMany(() => Ciudad, (ciudad) => ciudad.provincia)
  ciudades: Ciudad[];
}
