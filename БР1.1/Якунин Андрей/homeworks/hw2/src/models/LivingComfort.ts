import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Living } from './Living';
import { Comfort } from './Comfort';

@Entity()
export class LivingComfort {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Living, living => living.livingComforts)
    living: Living;

    @ManyToOne(() => Comfort, comfort => comfort.livingComforts)
    comfort: Comfort;
}
