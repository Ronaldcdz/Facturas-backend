import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}
  async create(createUsuarioDto: CreateUsuarioDto) {
    const usuarioCreado = this.usuarioRepository.create(createUsuarioDto);
    return await this.usuarioRepository.save(usuarioCreado);
  }

  async updateHashedRefreshToken(
    usuarioId: number,
    hashedRefreshToken: string,
  ) {
    return await this.usuarioRepository.update(
      { id: usuarioId },
      { hashedRefreshToken },
    );
  }

  async findByEmail(email: string) {
    return await this.usuarioRepository.findOne({
      where: {
        correo: email,
      },
    });
  }

  findAll() {
    return `This action returns all usuario`;
  }

  async findOne(id: number) {
    return await this.usuarioRepository.findOne({
      where: {
        id,
      },
    });
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}
