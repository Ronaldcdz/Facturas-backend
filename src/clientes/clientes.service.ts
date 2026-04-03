import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { Repository } from 'typeorm';
import { ListClienteDto } from './dto/list-cliente.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ) {}

  async create(createClienteDto: CreateClienteDto): Promise<ListClienteDto> {
    const nuevoCliente = this.clienteRepository.create(createClienteDto);
    const clienteGuardado = await this.clienteRepository.save(nuevoCliente);

    return plainToInstance(ListClienteDto, clienteGuardado, {
      excludeExtraneousValues: true,
    });
  }

  async findAll(): Promise<ListClienteDto[]> {
    const clientes: Cliente[] = await this.clienteRepository.find({
      relations: {
        ciudad: {
          provincia: true,
        },
      },
    });
    return plainToInstance(ListClienteDto, clientes, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(id: number): Promise<ListClienteDto> {
    const cliente: Cliente | null = await this.clienteRepository.findOne({
      where: { id },
      relations: {
        ciudad: true,
      },
    });
    if (!cliente) {
      throw new NotFoundException(`Cliente #${id} no encontrado`);
    }
    const clienteDto: ListClienteDto = plainToInstance(
      ListClienteDto,
      cliente,
      {
        excludeExtraneousValues: true,
      },
    );
    console.log('UN SOLO CLIENTE', clienteDto);
    return clienteDto;
  }

  async update(id: number, updateClienteDto: UpdateClienteDto) {
    const cliente = await this.clienteRepository.preload(updateClienteDto);

    if (!cliente) {
      throw new NotFoundException(`Cliente #${id} no encontrado`);
    }

    console.log('CLIENTE EN MEMORIA', cliente);
    return await this.clienteRepository.save(cliente);
  }

  async remove(id: number): Promise<string> {
    const result = await this.clienteRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Cliente con ID #${id} no encontrado`);
    }

    return `Cliente #${id} eliminado con éxito`;
  }
}
