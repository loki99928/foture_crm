import {BaseEntity, BeforeInsert, Column, Entity, PrimaryGeneratedColumn} from "typeorm"
import * as bcrypt from "bcrypt";
import {GET_ALPHA_NUMERIC_RANDOM as getAlphaNumericRandom} from "../../app.utils";

@Entity({name: 'own_temporary_user'})
export class TemporaryUserEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number

    // todo-dv вернуть unique: true,
    @Column({
        // unique: true,
        nullable: false
    })
    email: string

    @Column({
        nullable: false
    })
    password: string

    @Column()
    hashUser: string

    @Column({
        default: 0
    })
    attemptsNumber: number

    @BeforeInsert()
    async setHashUser(){
        this.hashUser = getAlphaNumericRandom(20)
    }

    @BeforeInsert()
    async setPassword(password: string){
        const salt = bcrypt.genSalt()
        this.password = await bcrypt.hash(password || this.password, await salt)
    }
    // todo-dv нужно сделать время жизни записи
}

