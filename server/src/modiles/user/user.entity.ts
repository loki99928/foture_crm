import {BaseEntity, BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import * as bcrypt from "bcrypt";
import {GET_ALPHA_NUMERIC_RANDOM as getAlphaNumericRandom} from "../../app.utils";
import {ImagesEntity} from "../images/images.entity";
import {ApiProperty} from "@nestjs/swagger";

export enum UserRole {
    SUPERADMIN = "superadmin",
    ADMIN = "admin",
    EDITOR = "editor",
    SUBSCRIBER = "subscriber",
}

@Entity({name: 'own_users'})
export class UserEntity extends BaseEntity {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    public id: number

    @ApiProperty()
    @Column( {
        type: 'varchar',
        length: 50,
        unique: true,
        nullable: false
    })
    public email: string

    @ApiProperty()
    @Column( {
        type: 'varchar',
        length: 100,
        nullable: false
    })
    public password: string

    @ApiProperty()
    @Column({
        type: 'varchar',
        length: 20,
        default: undefined
    })
    public hashUser: string

    /**
     * number of password reset requests
     */
    @ApiProperty()
    @Column( {
        type: 'smallint',
        default: 0
    })
    public attemptsNumber: number

    /**
     * confirm of email
     */
    @ApiProperty()
    @Column( {
        type: 'boolean',
        default: false
    })
    public confirm: boolean

    /**
     * confirm of email
     */
    @ApiProperty()
    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.EDITOR,
    })
    public role: UserRole

    /**
     * Half-day password change request time
     */
    @ApiProperty()
    @Column({
        type: 'date',
        default: null
    })
    public lastModifiedTime: Date

    /**
     * images of user
     */
    @ApiProperty()
    @ManyToOne(
        type => ImagesEntity,
        images => images.users
    )
    public avatar: ImagesEntity

    @BeforeInsert()
    async setHashUser() {
        this.hashUser = getAlphaNumericRandom(20)
    }

    @BeforeUpdate()
    @BeforeInsert()
    async hashPassword(password: string) {
        const salt = bcrypt.genSalt()
        this.password = await bcrypt.hash(password || this.password, await salt)
        return this.password
    }

    async toResponseObject(showToken: boolean = true) {
        const {id, email, password, hashUser, attemptsNumber, confirm, role, lastModifiedTime} = this
        const responseObject: any = {id, email, password, hashUser, attemptsNumber, confirm, role, lastModifiedTime}

        if (this.avatar){
            responseObject.avatarUrl = this.avatar.url;
        }

        return responseObject
    }

}
