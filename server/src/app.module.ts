import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {MailerModule} from "@nestjs-modules/mailer";
import {LoggerModule} from "nestjs-pino";
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AuthModule} from "./modiles/auth/auth.module";
import {typeOrmConfigAsync} from "./config/typeorm.config";
import {getMailConfig} from "./config/mailer.config";
import {UserModule} from "./modiles/user/user.module";
import {ImagesModule} from "./modiles/images/images.module";


@Module({
    imports: [
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
        LoggerModule.forRoot({
            pinoHttp: {
                customProps: (req, res) => ({
                    context: 'HTTP',
                }),
                transport: {
                    target: 'pino-pretty',
                },
            },
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
