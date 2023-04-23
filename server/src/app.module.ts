import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import {MailerModule, MailerService} from "@nestjs-modules/mailer";
import {LoggerModule} from "nestjs-pino";
import {AuthModule} from "./modiles/auth/auth.module";
import {typeOrmConfigAsync} from "./config/typeorm.config";
import {getMailConfig} from "./config/mailer.config";
import {UserModule} from "./modiles/user/user.module";
import {ImagesModule} from "./modiles/images/images.module";
import {join} from "path";
import {ServeStaticModule} from "@nestjs/serve-static";
import {EventEmitterModule} from "@nestjs/event-emitter";
import {settingsLog} from "./config/logger";
import {SettingsModule} from "./modiles/settings/settings.module";

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
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '/')
        }),
        LoggerModule.forRoot(settingsLog),
        EventEmitterModule.forRoot(),
        AuthModule,
        UserModule,
        ImagesModule,
    ]
})

export class AppModule {
    constructor() {
        console.log(join(__dirname, 'assets'))
    }
}