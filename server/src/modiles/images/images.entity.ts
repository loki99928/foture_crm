import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn
} from "typeorm";
import {UserEntity} from "../user/user.entity";
import {ApiProperty} from "@nestjs/swagger";

@Entity({name: 'own_images'})
export class ImagesEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    @ApiProperty()
    public id: number

    @CreateDateColumn()
    @ApiProperty()
    created: Date;

    @Column({
        type: 'varchar',
        length: 10
    })
    @ApiProperty()
    public type: string

    @Column({
        type: "varchar",
        length: 200
    })
    @ApiProperty()
    public url: string

    @OneToMany(
        () => UserEntity,
        (user: UserEntity) => user.avatar,
        {cascade: true}
    )
    @ApiProperty()
    @JoinTable()
    public users: UserEntity[]

    toResponseObject(showToken: boolean = true) {
        const {id, type, url} = this
        const responseObject: any = {id, type, url}

        return responseObject
    }
}
