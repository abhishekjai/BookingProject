import { Length, IsPositive} from 'class-validator'

export class createCinemaDTO {
    @Length(4, 15)
    name: string

    @IsPositive()
    seat_count: number
}