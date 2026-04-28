import { Module } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { ClientesController } from './clientes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { CiudadesModule } from '../ciudades/ciudades.module';
import { ClientesSeedService } from './clientes-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente]), CiudadesModule],
  controllers: [ClientesController],
  providers: [ClientesService, ClientesSeedService],
})
export class ClientesModule {}
