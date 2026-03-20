import { Module } from '@nestjs/common';
import { CiudadesService } from './ciudades.service';
import { CiudadesController } from './ciudades.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ciudad } from './entities/ciudad.entity';
import { CiudadesSeedService } from './ciudades-seed.service';
import { ProvinciasModule } from 'src/provincias/provincias.module';

@Module({
  imports: [TypeOrmModule.forFeature([Ciudad]), ProvinciasModule],
  controllers: [CiudadesController],
  providers: [CiudadesService, CiudadesSeedService],
  exports: [TypeOrmModule],
})
export class CiudadesModule {}
