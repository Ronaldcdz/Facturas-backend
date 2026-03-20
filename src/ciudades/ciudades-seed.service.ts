import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ciudad } from './entities/ciudad.entity';

const ciudades = [
  // Distrito Nacional
  { id: 1, nombre: 'Santo Domingo de Guzmán', provinciaId: 5 },

  // Santo Domingo
  { id: 2, nombre: 'Santo Domingo Este', provinciaId: 31 },
  { id: 3, nombre: 'Santo Domingo Norte', provinciaId: 31 },
  { id: 4, nombre: 'Santo Domingo Oeste', provinciaId: 31 },
  { id: 5, nombre: 'Boca Chica', provinciaId: 31 },
  { id: 6, nombre: 'Los Alcarrizos', provinciaId: 31 },
  { id: 7, nombre: 'Pedro Brand', provinciaId: 31 },

  // Santiago
  { id: 8, nombre: 'Santiago de los Caballeros', provinciaId: 29 },
  { id: 9, nombre: 'Baitoa', provinciaId: 29 },
  { id: 10, nombre: 'Jánico', provinciaId: 29 },
  { id: 11, nombre: 'Licey al Medio', provinciaId: 29 },
  { id: 12, nombre: 'Puñal', provinciaId: 29 },
  { id: 13, nombre: 'Sabana Iglesia', provinciaId: 29 },
  { id: 14, nombre: 'San José de las Matas', provinciaId: 29 },
  { id: 15, nombre: 'Tamboril', provinciaId: 29 },
  { id: 16, nombre: 'Villa Bisonó (Navarrete)', provinciaId: 29 },

  // La Vega
  { id: 17, nombre: 'La Vega', provinciaId: 15 },
  { id: 18, nombre: 'Constanza', provinciaId: 15 },
  { id: 19, nombre: 'Jarabacoa', provinciaId: 15 },
  { id: 20, nombre: 'Jima Abajo', provinciaId: 15 },

  // Duarte
  { id: 21, nombre: 'San Francisco de Macorís', provinciaId: 6 },
  { id: 22, nombre: 'Arenoso', provinciaId: 6 },
  { id: 23, nombre: 'Castillo', provinciaId: 6 },
  { id: 24, nombre: 'Eugenio María de Hostos', provinciaId: 6 },
  { id: 25, nombre: 'Las Guáranas', provinciaId: 6 },
  { id: 26, nombre: 'Pimentel', provinciaId: 6 },
  { id: 27, nombre: 'Villa Riva', provinciaId: 6 },

  // Puerto Plata
  { id: 28, nombre: 'Puerto Plata', provinciaId: 22 },
  { id: 29, nombre: 'Altamira', provinciaId: 22 },
  { id: 30, nombre: 'Guananico', provinciaId: 22 },
  { id: 31, nombre: 'Imbert', provinciaId: 22 },
  { id: 32, nombre: 'Los Hidalgos', provinciaId: 22 },
  { id: 33, nombre: 'Luperón', provinciaId: 22 },
  { id: 34, nombre: 'Sosúa', provinciaId: 22 },
  { id: 35, nombre: 'Villa Isabela', provinciaId: 22 },

  // La Romana
  { id: 36, nombre: 'La Romana', provinciaId: 14 },
  { id: 37, nombre: 'Guaymate', provinciaId: 14 },
  { id: 38, nombre: 'Villa Hermosa', provinciaId: 14 },

  // San Pedro de Macorís
  { id: 39, nombre: 'San Pedro de Macorís', provinciaId: 27 },
  { id: 40, nombre: 'Consuelo', provinciaId: 27 },
  { id: 41, nombre: 'Quisqueya', provinciaId: 27 },
  { id: 42, nombre: 'Ramón Santana', provinciaId: 27 },
  { id: 43, nombre: 'San José de los Llanos', provinciaId: 27 },
  { id: 44, nombre: 'Guayacanes', provinciaId: 27 },

  // La Altagracia
  { id: 45, nombre: 'Higüey', provinciaId: 13 },
  { id: 46, nombre: 'San Rafael del Yuma', provinciaId: 13 },

  // Peravia
  { id: 47, nombre: 'Baní', provinciaId: 21 },
  { id: 48, nombre: 'Nizao', provinciaId: 21 },
  { id: 49, nombre: 'Matanzas', provinciaId: 21 },

  // San Cristóbal
  { id: 50, nombre: 'San Cristóbal', provinciaId: 24 },
  { id: 51, nombre: 'Bajos de Haina', provinciaId: 24 },
  { id: 52, nombre: 'Cambita Garabitos', provinciaId: 24 },
  { id: 53, nombre: 'Los Cacaos', provinciaId: 24 },
  { id: 54, nombre: 'Sabana Grande de Palenque', provinciaId: 24 },
  { id: 55, nombre: 'San Gregorio de Nigua', provinciaId: 24 },
  { id: 56, nombre: 'Villa Altagracia', provinciaId: 24 },
  { id: 57, nombre: 'Yaguate', provinciaId: 24 },

  // San Juan
  { id: 58, nombre: 'San Juan de la Maguana', provinciaId: 26 },
  { id: 59, nombre: 'Bohechío', provinciaId: 26 },
  { id: 60, nombre: 'El Cercado', provinciaId: 26 },
  { id: 61, nombre: 'Juan de Herrera', provinciaId: 26 },
  { id: 62, nombre: 'Las Matas de Farfán', provinciaId: 26 },
  { id: 63, nombre: 'Vallejuelo', provinciaId: 26 },

  // Samaná
  { id: 64, nombre: 'Samaná', provinciaId: 23 },
  { id: 65, nombre: 'Las Terrenas', provinciaId: 23 },
  { id: 66, nombre: 'Sánchez', provinciaId: 23 },

  // María Trinidad Sánchez
  { id: 67, nombre: 'Nagua', provinciaId: 16 },
  { id: 68, nombre: 'Cabrera', provinciaId: 16 },
  { id: 69, nombre: 'El Factor', provinciaId: 16 },
  { id: 70, nombre: 'Río San Juan', provinciaId: 16 },

  // Azua
  { id: 71, nombre: 'Azua de Compostela', provinciaId: 1 },
  { id: 72, nombre: 'Estebanía', provinciaId: 1 },
  { id: 73, nombre: 'Guayabal', provinciaId: 1 },
  { id: 74, nombre: 'Las Charcas', provinciaId: 1 },
  { id: 75, nombre: 'Padre Las Casas', provinciaId: 1 },
  { id: 76, nombre: 'Peralta', provinciaId: 1 },
  { id: 77, nombre: 'Pueblo Viejo', provinciaId: 1 },
  { id: 78, nombre: 'Sabana Yegua', provinciaId: 1 },
  { id: 79, nombre: 'Tábara Arriba', provinciaId: 1 },

  //Hato Mayor
  { id: 80, nombre: 'Hato Mayor del Rey', provinciaId: 10 },
  { id: 81, nombre: 'Sabana de la Mar', provinciaId: 10 },
  { id: 82, nombre: 'El Valle', provinciaId: 10 },

  //Monte Cristi
  { id: 83, nombre: 'San Fernando de Monte Cristi', provinciaId: 18 },
  { id: 84, nombre: 'Castañuela', provinciaId: 18 },
  { id: 85, nombre: 'Guayubín', provinciaId: 18 },
  { id: 86, nombre: 'Las Matas de Santa Cruz', provinciaId: 18 },
  { id: 87, nombre: 'Pepillo Salcedo', provinciaId: 18 },
  { id: 88, nombre: 'Villa Vásquez', provinciaId: 18 },

  // Bahoruco
  { id: 89, nombre: 'Neiba', provinciaId: 2 },
  { id: 90, nombre: 'Galván', provinciaId: 2 },
  { id: 91, nombre: 'Los Ríos', provinciaId: 2 },
  { id: 92, nombre: 'Tamayo', provinciaId: 2 },
  { id: 93, nombre: 'Villa Jaragua', provinciaId: 2 },

  // Monte Plata
  { id: 94, nombre: 'Monte Plata', provinciaId: 19 },
  { id: 95, nombre: 'Boyá', provinciaId: 19 },
  { id: 96, nombre: 'Chirino', provinciaId: 19 },
  { id: 97, nombre: 'Don Juan', provinciaId: 19 },

  // Santiago Rodriguez
  { id: 98, nombre: 'San Ignacio de Sabaneta', provinciaId: 30 },
  { id: 99, nombre: 'Monción', provinciaId: 30 },
  { id: 100, nombre: 'Villa Los Almácigos', provinciaId: 30 },

  // Espaillat
  { id: 101, nombre: 'Moca', provinciaId: 9 },
  { id: 102, nombre: 'Cayetano Germosén', provinciaId: 9 },
  { id: 103, nombre: 'Gaspar Hernández', provinciaId: 9 },
  { id: 104, nombre: 'Jamao al Norte', provinciaId: 9 },
  { id: 105, nombre: 'San Víctor', provinciaId: 9 },

  // El Seibo
  { id: 106, nombre: 'Santa Cruz de El Seibo', provinciaId: 8 },
  { id: 107, nombre: 'Miches', provinciaId: 8 },

  { id: 108, nombre: 'Comendador', provinciaId: 7 },
  { id: 109, nombre: 'Bánica', provinciaId: 7 },
  { id: 110, nombre: 'El Llano', provinciaId: 7 },
  { id: 111, nombre: 'Hondo Valle', provinciaId: 7 },
  { id: 112, nombre: 'Juan Santiago', provinciaId: 7 },
  { id: 113, nombre: 'Pedro Santana', provinciaId: 7 },

  { id: 114, nombre: 'Cevicos', provinciaId: 28 },
  { id: 115, nombre: 'Cotuí', provinciaId: 28 },
  { id: 116, nombre: 'Fantino', provinciaId: 28 },
  { id: 117, nombre: 'La mata', provinciaId: 28 },

  // Barahona
  { id: 118, nombre: 'Cabral', provinciaId: 3 },
  { id: 119, nombre: 'Enriquillo', provinciaId: 3 },
  { id: 120, nombre: 'Paraíso', provinciaId: 3 },
  { id: 121, nombre: 'Vicente Noble', provinciaId: 3 },
  { id: 122, nombre: 'El Peñón', provinciaId: 3 },
  { id: 123, nombre: 'La Ciénaga', provinciaId: 3 },
  { id: 124, nombre: 'Fundación', provinciaId: 3 },
  { id: 125, nombre: 'Las Salinas', provinciaId: 3 },
  { id: 126, nombre: 'Polo', provinciaId: 3 },
  { id: 127, nombre: 'Jaquimeyes', provinciaId: 3 },

  // San José
  { id: 128, nombre: 'San José de Ocoa', provinciaId: 25 },
  { id: 129, nombre: 'Rancho Arriba', provinciaId: 25 },
  { id: 130, nombre: 'Sabana Larga', provinciaId: 25 },

  // Monseño
  { id: 131, nombre: 'Bonao', provinciaId: 17 },
  { id: 132, nombre: 'Maimón', provinciaId: 17 },
  { id: 133, nombre: 'Piedra Blanca', provinciaId: 17 },

  // Valverde
  { id: 134, nombre: 'Mao', provinciaId: 32 },
  { id: 135, nombre: 'Esperanza', provinciaId: 32 },
  { id: 136, nombre: 'Laguna Salada', provinciaId: 32 },

  // Dajabón
  { id: 137, nombre: 'Dajabón', provinciaId: 4 },
  { id: 138, nombre: 'Loma de Cabrera', provinciaId: 4 },
  { id: 139, nombre: 'Partido', provinciaId: 4 },
  { id: 140, nombre: 'Restauración', provinciaId: 4 },
  { id: 141, nombre: 'El Pino', provinciaId: 4 },

  // Hermanas Mirabal
  { id: 142, nombre: 'Salcedo', provinciaId: 11 },
  { id: 143, nombre: 'Tenares', provinciaId: 11 },
  { id: 144, nombre: 'Villa Tapia', provinciaId: 11 },

  // Pedernales
  { id: 145, nombre: 'Pedernales', provinciaId: 20 },
  { id: 146, nombre: 'Oviedo', provinciaId: 20 },

  // Independencia
  { id: 147, nombre: 'Cristóbal', provinciaId: 12 },
  { id: 148, nombre: 'Duvergé', provinciaId: 12 },
  { id: 149, nombre: 'La Descubierta', provinciaId: 12 },
  { id: 150, nombre: 'Mella', provinciaId: 12 },
  { id: 151, nombre: 'Postrer Río', provinciaId: 12 },
];
@Injectable()
export class CiudadesSeedService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Ciudad)
    private readonly ciudadRepository: Repository<Ciudad>,
  ) {}

  // Este método se ejecuta automáticamente cuando NestJS arranca
  async onApplicationBootstrap() {
    await this.seed();
  }

  async seed() {
    const count = await this.ciudadRepository.count();

    if (count > 0) {
      console.log('✅ Las ciudades ya existen en la DB. Saltando seed...');
      return;
    }

    await this.ciudadRepository.save(ciudades);
    console.log('🚀 Seed completado: Ciudades insertadas correctamente.');
  }
}
