import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import {User} from "./User";
import {CategoryEntity} from "./category";
import {AdvertisementStatus} from "./enums/advertismentStatus";
import {RentType} from "./enums/rentType";
import {PhotoEntity} from "./photo";
import {MessageEntity} from "./message";
import {RulesEntity} from "./rules";

@Entity({name: 'advertisements'})
export class AdvertisementEntity extends  BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User)
    @JoinColumn({name: "owner_id"})
    owner: User;

    @Column({type: "text"})
    title: string;

    @Column({type: "text"})
    description: string;

    @ManyToOne(() => CategoryEntity)
    @JoinColumn({name: "category_id"})
    category: CategoryEntity;

    @Column({
        type: "enum",
        enum: RentType,
        name: "rent_type"
    })
    rentType: RentType;

    @Column({
        type: "enum",
        enum: AdvertisementStatus,
        default: AdvertisementStatus.PENDING
    })
    status: AdvertisementStatus;

    @CreateDateColumn({name: "created_at"})
    createdAt: Date;

    @Column({type: "decimal", name: "price_per_period"})
    pricePerPeriod: number;

    @Column({type: "decimal", name: "commision"})
    commission: number;

    @Column({type: "decimal", name: "deposit"})
    deposit: number;

    @OneToMany(() => PhotoEntity, photo => photo.advertisement)
    photos: PhotoEntity[];

    @OneToMany(() => MessageEntity, message => message.advertisement)
    messages: MessageEntity[];

    @OneToOne(() => RulesEntity, rules => rules.advertisement)
    rules: RulesEntity;
}