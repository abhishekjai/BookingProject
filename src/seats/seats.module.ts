import { Module } from '@nestjs/common';
import { SeatsService } from './seats.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seats } from 'src/entities/seats.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Seats])
  ],
  controllers: [],
  providers: [SeatsService],
  exports:[SeatsService]
})
export class SeatsModule {}
