import { Module } from '@nestjs/common';
import { CinemaController } from './cinema.controller';
import { CinemaService } from './cinema.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cinema } from 'src/entities/cinema.entity';
import { SeatsModule } from 'src/seats/seats.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cinema]),
    SeatsModule,
  ],
  controllers: [CinemaController],
  providers: [CinemaService],
})
export class CinemaModule {}
