import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm'
import { Seats } from './seats.entity';

@Entity({name:"cinema"})
export class Cinema{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    name: string;

    @OneToMany(() => Seats,(seat) => seat.cinema_no )
    seats: Seats[];

    @Column({nullable: false})
    seat_count: number;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;
    
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updated_at: Date;
}