import { Ciudad } from 'src/ciudades/entities/ciudad.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('clientes')
export class Cliente {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 15, unique: true })
  rnc: string;

  @Column({ length: 100, nullable: true })
  direccion: string;

  @Column({ name: 'ciudad_id', nullable: true })
  ciudadId: number;

  @ManyToOne(() => Ciudad, { nullable: true })
  @JoinColumn({ name: 'ciudad_id' })
  ciudad: Ciudad;

  @Column({ unique: true, nullable: true })
  correo: string;

  @Column({ nullable: true })
  telefono: string;
}
