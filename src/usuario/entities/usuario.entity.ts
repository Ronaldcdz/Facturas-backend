import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import * as bcrypt from 'bcrypt';
import { Rol } from 'src/auth/enums/role.enum';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ unique: true, nullable: true })
  correo: string;

  @Column()
  contrasenia: string;

  @Column({ nullable: true })
  hashedRefreshToken: string;

  @Column({
    type: 'enum',
    enum: Rol,
    default: Rol.Usuario,
  })
  rol: number;

  @CreateDateColumn()
  fechaCreacion: Date;

  @UpdateDateColumn()
  fechaActualizado: Date;

  @BeforeInsert()
  async hashContrasenia() {
    this.contrasenia = await bcrypt.hash(this.contrasenia, 10);
  }
}
