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
import {ImagesModule} from "./modiles/images/images.module";


@Module({
    imports: [
        // todo-dv разобраться почему не работает isGlobal: true у ConfigModule
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`,
            isGlobal: true
        }),
        TypeOrmModule.forRootAsync(typeOrmConfigAsync),
        MailerModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getMailConfig,
        }),
        AuthModule,
        UserModule,
        ImagesModule
    ],
    controllers: [AppController],
    providers: [AppService],
})

export class AppModule {
}
