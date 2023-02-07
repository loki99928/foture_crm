import {BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {UserEntity} from "../user/user.entity";

@Entity({name: 'own_images'})
export class ImagesEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id: number

    @Column({
        type: 'character',
        length: 10
    })
    public type: string

    @Column({
        type: "character",
        length: 200
    })
    public url: string

    @OneToMany(
        () => UserEntity,
        (user: UserEntity) => user.avatar,
        {cascade: true}
    )
    @JoinTable()
    public users: UserEntity[]

    async toResponseObject(showToken: boolean = true) {
        const {id, type, url} = this
        const responseObject: any = {id, type, url}

        return responseObject
    }
}
