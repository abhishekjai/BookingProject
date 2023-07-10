import { Injectable } from '@nestjs/common';
import { InjectRepository} from '@nestjs/typeorm'
import { Repository} from 'typeorm'
import  { Seats } from '../entities/seats.entity'
import { DataSource } from 'typeorm'


@Injectable()
export class SeatsService {
  constructor(
    @InjectRepository(Seats) private seatsRepository: Repository<Seats>, 
    private dataSource: DataSource
){}


  async createSeats(cinemaNo: number, seatCount: number) {
    const seatsArr = Array.from({length: seatCount}, (_, seat_no) => {
        return {
            seat_no: seat_no + 1,
            cinema_no :cinemaNo
        }
    })
    return await this.seatsRepository
    .createQueryBuilder()
    .insert()
    .into(Seats)
    .values(seatsArr)
    .execute()
  }

  async bookSeat(cinemaNo: number, seatNo: number){
   return await this.seatsRepository
    .createQueryBuilder()
    .update()
    .set({
        occupied:true
    })
    .where({
        seat_no: seatNo,
        cinema_no: cinemaNo,
        occupied: false
    })
    .execute()
    
  }

  async bookMultipleSeats(seatNosArr: Number[], cinemaNo: Number) {
    const queryRunner = this.dataSource.createQueryRunner();

    let check = true;
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {

        for(let seatNo of seatNosArr){
            const result = await queryRunner.manager
            .createQueryBuilder()
            .update(Seats)
            .set({
                occupied:true
            })
            .where({
                seat_no: seatNo,
                cinema_no: cinemaNo,
                occupied: false
            })
            .execute()
            if(result.affected == 0) {
                check = false;
                throw new Error("Transaction Failed")
            }
        }

        await queryRunner.commitTransaction();
    } catch (err) {
        await queryRunner.rollbackTransaction();
    } finally {

        await queryRunner.release();
        return check;
    }
  }
}
