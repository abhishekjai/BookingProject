import { Injectable } from '@nestjs/common';
import { InjectRepository} from '@nestjs/typeorm'
import { Repository} from 'typeorm'
import  { Cinema} from '../entities/cinema.entity'
import { createCinemaDTO  } from './dtos/createCinema.dto';

@Injectable()
export class CinemaService {
  constructor(@InjectRepository(Cinema) private cinemaRepository: Repository<Cinema>){}


  async createCinema(createCinema: createCinemaDTO) {
     return await this.cinemaRepository.save(createCinema)
  }

  async getCinema(cinemaNo: Number) : Promise<Cinema[]> {
    return await this.cinemaRepository.createQueryBuilder("cinema")
    .leftJoinAndSelect("cinema.seats", "seats").getMany()

  }
}
