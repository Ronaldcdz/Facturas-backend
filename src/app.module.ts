import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientesModule } from './clientes/clientes.module';
import { CiudadesModule } from './ciudades/ciudades.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductosModule } from './productos/productos.module';
import { ProvinciasModule } from './provincias/provincias.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'nest_user',
      password: 'nest_password',
      database: 'nest_db',
      synchronize: true, // Solo para desarrollo, ¡no usar en producción!
      autoLoadEntities: true,
    }),
    ClientesModule,
    CiudadesModule,
    ProvinciasModule,
    ProductosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
