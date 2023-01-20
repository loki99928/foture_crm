import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {UserEntity} from "../user/user.entity";

@Entity({name: 'own_avatars'})
export class AvatarsEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    @OneToMany(() => UserEntity, (user: UserEntity) => user.avatarId)
    public id: number

    @Column()
    public url: string

}

