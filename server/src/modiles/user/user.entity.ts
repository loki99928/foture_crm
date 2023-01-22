import {
    BaseEntity,
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity, JoinTable,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import * as bcrypt from "bcrypt";
import {GET_ALPHA_NUMERIC_RANDOM as getAlphaNumericRandom} from "../../app.utils";
import {ImagesEntity} from "../images/images.entity";

export enum UserRole {
    ADMIN = "admin",
    EDITOR = "editor",
    SUBSCRIBER = "subscriber",
}

@Entity({name:'own_users'})
export class UserEntity extends BaseEntity{

    @PrimaryGeneratedColumn()
    public id: number

    @Column({
        unique: true,
        nullable: false
    })
    public email: string

    @Column({
        nullable: false
    })
    public password: string

    @Column({
        default: undefined
    })
    public hashUser: string

    /**
     * number of password reset requests
     */
    @Column({
        default: 0
    })
    public attemptsNumber: number

    /**
     * confirm of email
     */
    @Column({
        default: false
    })
    public confirm: boolean

    /**
     * confirm of email
     */
    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.EDITOR,
    })
    public role: UserRole

    /**
     * Half-day password change request time
     */
    @Column({
        default: null
    })
    public lastModifiedTime: Date

    /**
     * images of user
     */
    @ManyToOne( () => ImagesEntity, (images: ImagesEntity) => images.users )
    public avatar: number

    @BeforeInsert()
    async setHashUser(){
        this.hashUser = getAlphaNumericRandom(20)
    }

    @BeforeUpdate()
    @BeforeInsert()
    async hashPassword(password: string){
        const salt = bcrypt.genSalt()
        this.password = await bcrypt.hash(password || this.password, await salt)
        return this.password
    }

    @BeforeInsert()
    async setAvatar(){
        this.avatar = Math.round(Math.random()*10)
    }

}
