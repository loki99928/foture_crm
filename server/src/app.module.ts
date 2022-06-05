import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {MailerModule} from "@nestjs-modules/mailer";
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AuthModule} from "./modiles/auth/auth.module";
import {typeOrmConfigAsync} from "./config/typeorm.config";
import {getMailConfig} from "./config/mailer.config";
import {UserModule} from "./modiles/user/user.module";


@Module({
    imports: [
        // todo-dv разобраться почему не работает isGlobal: true у ConfigModule
        ConfigModule.forRoot({ envFilePath: `.${process.env.NODE_ENV}.env` }),
        TypeOrmModule.forRootAsync(typeOrmConfigAsync),
        MailerModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getMailConfig,
        }),
        AuthModule,
        UserModule
    ],
    controllers: [AppController],
    providers: [AppService],
})

export class AppModule {
}
