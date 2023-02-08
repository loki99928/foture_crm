import {BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {UserEntity} from "../user/user.entity";
import {ApiProperty} from "@nestjs/swagger";

@Entity({name: 'own_images'})
export class ImagesEntity extends BaseEntity {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    public id: number

    @ApiProperty()
    @Column({
        type: 'character',
        length: 10
    })
    public type: string

    @ApiProperty()
    @Column({
        type: "character",
        length: 200
    })
    public url: string

    @ApiProperty()
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
