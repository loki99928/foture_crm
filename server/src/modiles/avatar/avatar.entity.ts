import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: 'own_avatars'})
export class AvatarsEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    url: string

}

