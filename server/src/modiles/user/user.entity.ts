import {BaseEntity, BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import * as bcrypt from "bcrypt";
import {GET_ALPHA_NUMERIC_RANDOM as getAlphaNumericRandom} from "../../app.utils";
import {AvatarsEntity} from "../avatar/avatar.entity";

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
     * administrator | editor | author | contributor | subscriber
     */
    @Column({
        default: 2
    })
    public role: number

    /**
     * avatar of user
     */
    @Column()
    // @ManyToOne( () => AvatarsEntity, (avatar: AvatarsEntity) => avatar.id )
    public avatarId: number

    /**
     * Half-day password change request time
     */
    @Column({
        default: null
    })
    public lastModifiedTime: Date

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

    // @BeforeInsert()
    // async setAvatarId(){
    //     this.avatarId = Math.round(Math.random()*10)
    // }

}
