import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './entities/cliente.entity';

const clientes = [
  {
    id: 1,
    nombre: 'Importadora Azua SRL',
    rnc: '101234567',
    direccion: 'Av. Libertad 123, Azua',
    ciudadId: 71, // Azua de Compostela
    correo: 'ventas@importadoraazua.com',
    telefono: '809-555-0101',
  },
  {
    id: 2,
    nombre: 'Comercial La Vega',
    rnc: '102345678',
    direccion: 'Calle Duarte 45, La Vega',
    ciudadId: 17, // La Vega
    correo: 'info@comercialvega.com',
    telefono: '809-555-0102',
  },
  {
    id: 3,
    nombre: 'Distribuidora Santiago',
    rnc: '103456789',
    direccion: 'Av. Estrella Sadhalá 210, Santiago',
    ciudadId: 8, // Santiago de los Caballeros
    correo: 'ventas@distribuidorasantiago.com',
    telefono: '809-555-0103',
  },
  {
    id: 4,
    nombre: 'Ferretería Puerto Plata',
    rnc: '104567890',
    direccion: 'Calle Beller 78, Puerto Plata',
    ciudadId: 28, // Puerto Plata
    correo: 'ferreteria@puertoplata.com',
    telefono: '809-555-0104',
  },
  {
    id: 5,
    nombre: 'Supermercado Oriental',
    rnc: '105678901',
    direccion: 'Av. San Martín 345, Santo Domingo',
    ciudadId: 1, // Santo Domingo de Guzmán
    correo: 'super@superoriental.com',
    telefono: '809-555-0105',
  },
  {
    id: 6,
    nombre: 'Panadería La Altagracia',
    rnc: '106789012',
    direccion: 'Calle Principal 12, Higüey',
    ciudadId: 45, // Higüey
    correo: 'panaderia@altagracia.com',
    telefono: '809-555-0106',
  },
  {
    id: 7,
    nombre: 'Textil San Cristóbal',
    rnc: '107890123',
    direccion: 'Zona Industrial Km 22, San Cristóbal',
    ciudadId: 50, // San Cristóbal
    correo: 'textil@sancristobal.com',
    telefono: '809-555-0107',
  },
  {
    id: 8,
    nombre: 'Constructora Romana',
    rnc: '108901234',
    direccion: 'Av. Francisco Caamaño 89, La Romana',
    ciudadId: 36, // La Romana
    correo: 'constru@romana.com',
    telefono: '809-555-0108',
  },
  {
    id: 9,
    nombre: 'Farmacia San Juan',
    rnc: '109012345',
    direccion: 'Calle Independencia 34, San Juan',
    ciudadId: 58, // San Juan de la Maguana
    correo: 'farmacia@sanjuan.com',
    telefono: '809-555-0109',
  },
  {
    id: 10,
    nombre: 'Transporte Barahona',
    rnc: '110123456',
    direccion: 'Av. Enriquillo 156, Barahona',
    ciudadId: 118, // Cabral (ciudad de la provincia Barahona, la más representativa)
    correo: 'transporte@barahona.com',
    telefono: '809-555-0110',
  },
];
@Injectable()
export class ClientesSeedService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ) {}

  // Este método se ejecuta automáticamente cuando NestJS arranca
  async onApplicationBootstrap() {
    await this.seed();
  }

  async seed() {
    const count = await this.clienteRepository.count();

    if (count > 0) {
      console.log('✅ Los clientes ya existen en la DB. Saltando seed...');
      return;
    }

    await this.clienteRepository.save(clientes);
    console.log('🚀 Seed completado: Clientes insertados correctamente.');
  }
}
