import {BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {UserEntity} from "../user/user.entity";

@Entity({name: 'own_images'})
export class ImagesEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id: number

    @Column()
    public type: string

    @Column()
    public url: string

    @OneToMany(() => UserEntity, (user: UserEntity) => user.avatar)
    public users: UserEntity[]

}
