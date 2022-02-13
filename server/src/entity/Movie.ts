import {Entity, Column, PrimaryGeneratedColumn, BaseEntity} from 'typeorm';

@Entity()
export class Movie extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    like: string;

    @Column()
    userId: string;
}
