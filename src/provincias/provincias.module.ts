import { Module } from '@nestjs/common';
import { ProvinciasService } from './provincias.service';
import { ProvinciasController } from './provincias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Provincia } from './entities/provincia.entity';
import { ProvinciasSeedService } from './provincias-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([Provincia]), ProvinciasModule],
  controllers: [ProvinciasController],
  providers: [ProvinciasService, ProvinciasSeedService],
  exports: [TypeOrmModule],
})
export class ProvinciasModule {}
