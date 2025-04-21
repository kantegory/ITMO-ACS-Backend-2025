import { IsEmail } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm"
import { Character } from "./Character";
import { Message } from './Message';
import { Roll } from './Roll';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        unique: true,
        type: 'varchar'
    })
    @IsEmail()
    email: string

    @Column({type: 'varchar'})
    name: string

    @Column({type: 'varchar'})
    password: string

    @CreateDateColumn()
    registrationDate: Date

    @UpdateDateColumn()
    changeDate: Date

    @OneToMany(() => Character, character => character.player)
    characters: Character[]

    @OneToMany(() => Message, message => message.author)
    messages: Message[]

    @OneToMany(() => Roll, roll => roll.author)
    rolls: Roll[]
}
