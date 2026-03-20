import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Provincia } from './entities/provincia.entity';

const provincias = [
  { id: 1, nombre: 'Azua' },
  { id: 2, nombre: 'Bahoruco' },
  { id: 3, nombre: 'Barahona' },
  { id: 4, nombre: 'Dajabón' },
  { id: 5, nombre: 'Distrito Nacional' },
  { id: 6, nombre: 'Duarte' },
  { id: 7, nombre: 'Elías Piña' },
  { id: 8, nombre: 'El Seibo' },
  { id: 9, nombre: 'Espaillat' },
  { id: 10, nombre: 'Hato Mayor' },
  { id: 11, nombre: 'Hermanas Mirabal' },
  { id: 12, nombre: 'Independencia' },
  { id: 13, nombre: 'La Altagracia' },
  { id: 14, nombre: 'La Romana' },
  { id: 15, nombre: 'La Vega' },
  { id: 16, nombre: 'María Trinidad Sánchez' },
  { id: 17, nombre: 'Monseñor Nouel' },
  { id: 18, nombre: 'Monte Cristi' },
  { id: 19, nombre: 'Monte Plata' },
  { id: 20, nombre: 'Pedernales' },
  { id: 21, nombre: 'Peravia' },
  { id: 22, nombre: 'Puerto Plata' },
  { id: 23, nombre: 'Samaná' },
  { id: 24, nombre: 'San Cristóbal' },
  { id: 25, nombre: 'San José de Ocoa' },
  { id: 26, nombre: 'San Juan' },
  { id: 27, nombre: 'San Pedro de Macorís' },
  { id: 28, nombre: 'Sánchez Ramírez' },
  { id: 29, nombre: 'Santiago' },
  { id: 30, nombre: 'Santiago Rodríguez' },
  { id: 31, nombre: 'Santo Domingo' },
  { id: 32, nombre: 'Valverde' },
];
@Injectable()
export class ProvinciasSeedService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Provincia)
    private readonly provinciaRepository: Repository<Provincia>,
  ) {}

  // Este método se ejecuta automáticamente cuando NestJS arranca
  async onApplicationBootstrap() {
    await this.seed();
  }

  async seed() {
    const count = await this.provinciaRepository.count();

    if (count > 0) {
      console.log('✅ Las provincias ya existen en la DB. Saltando seed...');
      return;
    }

    await this.provinciaRepository.save(provincias);
    console.log('🚀 Seed completado: Provincias insertadas correctamente.');
  }
}
