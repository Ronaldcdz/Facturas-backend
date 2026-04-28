import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientesModule } from './clientes/clientes.module';
import { CiudadesModule } from './ciudades/ciudades.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ProductosModule } from './productos/productos.module';
import { ProvinciasModule } from './provincias/provincias.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeorm from './typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        config.get<TypeOrmModuleOptions>('typeorm')!,
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
