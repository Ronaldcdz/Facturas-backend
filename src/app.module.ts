import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientesModule } from './clientes/clientes.module';
import { CiudadesModule } from './ciudades/ciudades.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ProductosModule } from './productos/productos.module';
import { ProvinciasModule } from './provincias/provincias.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './usuario/usuario.module';
import typeorm from './config/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [typeorm],
      isGlobal: true,
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
    AuthModule,
    UsuarioModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
