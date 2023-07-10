import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm'
import { Cinema } from './cinema.entity';

@Entity({name:"seats"})
export class Seats{
    @PrimaryGeneratedColumn({})
    id: number;

    @ManyToOne(() => Cinema, {onDelete: "CASCADE", onUpdate:"CASCADE"})
    @JoinColumn({name: "cinema_no"})
    cinema_no: number;

    @Column({nullable: false})
    seat_no: number;

    @Column({ default: false })
    occupied: boolean;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;
    
    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updated_at: Date;
}