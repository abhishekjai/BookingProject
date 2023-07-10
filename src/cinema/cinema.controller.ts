import { Body, Controller, Get, Post, Param, ParseIntPipe, Res, ParseArrayPipe  } from '@nestjs/common';
import { CinemaService } from './cinema.service';
import { createCinemaDTO } from './dtos/createCinema.dto';
import { SeatsService } from 'src/seats/seats.service';
import { Response } from 'express';

@Controller("cinema")
export class CinemaController {
  constructor(private readonly cinemaService: CinemaService, private readonly seatsService: SeatsService) {}

  @Post()   
  async createCinema(
    @Body() createCinema: createCinemaDTO,
    @Res() res: Response,
) {

    const cinema= await this.cinemaService.createCinema(createCinema);

    await this.seatsService.createSeats(cinema.id, createCinema.seat_count)
    
    return res.status(201).json({
        message: "Cinema created successfully",
        id: cinema.id
    })
  }

  @Get(":id")
  async getCinema(
    @Param('id', new ParseIntPipe()) id: number,
    @Res() res: Response,
  ) {
    const cinema = await this.cinemaService.getCinema(id);
    return res.status(200).json({
        cinema: cinema,
    })
  }

  @Post(":id/book/:seat_no")
  async bookSeat(
    @Param('id', new ParseIntPipe()) id: number, 
    @Param('seat_no', new ParseIntPipe()) seat_no: number,
    @Res() res: Response,
  ){
    const book = await this.seatsService.bookSeat(id, seat_no);
    if(book.affected==0){
        return res.status(400).json({
            message: "Seat is already brought"
        })
    }else {
        return res.status(201).json({
            message: "Seat is successfully booked"
        })
    }
  }

  @Post(":id/book")
  async bookMultipleSeat(
    @Body("seat_nos", new ParseArrayPipe({items: Number})) seatNos: Number[],
    @Param('id', new ParseIntPipe()) cinema_no: number, 
    @Res() res: Response,
  ){
    const book = await this.seatsService.bookMultipleSeats(seatNos, cinema_no)
    if(book) {
        return res.status(40).json({
           message: "Specifed seats are not currently available"
        })
    }else {
        const cinema =  await this.cinemaService.getCinema(cinema_no);
        return res.status(200).json({
            message: "Specifed seats are successfully booked",
            cinema: cinema,
        })
    }
  }
}
