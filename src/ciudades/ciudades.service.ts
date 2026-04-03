import { Injectable } from '@nestjs/common';
import { CreateCiudadDto } from './dto/create-ciudad.dto';
import { UpdateCiudadDto } from './dto/update-ciudad.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ciudad } from './entities/ciudad.entity';
import { Repository } from 'typeorm';
import { ListCiudadDto } from './dto/list-ciudad.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CiudadesService {
  constructor(
    @InjectRepository(Ciudad)
    private readonly ciudadRepository: Repository<Ciudad>,
  ) {}
  create(createCiudadeDto: CreateCiudadDto) {
    return 'This action adds a new ciudade';
  }

  async findAll(): Promise<ListCiudadDto[]> {
    const ciudades: Ciudad[] = await this.ciudadRepository.find({
      relations: {
        provincia: true,
      },
    });
    console.log(ciudades);
    return plainToInstance(ListCiudadDto, ciudades, {
      excludeExtraneousValues: true,
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} ciudade`;
  }

  update(id: number, updateCiudadeDto: UpdateCiudadDto) {
    return `This action updates a #${id} ciudade`;
  }

  remove(id: number) {
    return `This action removes a #${id} ciudade`;
  }
}
