import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Living } from './Living';
import { Rules } from './Rules';

@Entity()
export class LivingRules {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Living, living => living.livingRules)
    living: Living;

    @ManyToOne(() => Rules, rules => rules.livingRules)
    rules: Rules;
}
