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
            rootPath: join(__dirname, 'assets'),
            serveRoot: "/assets",
        }),
        LoggerModule.forRoot({
            pinoHttp: {
                customLogLevel: function (req, res, err) {
                    if (res.statusCode >= 400 && res.statusCode < 500) {
                        return 'warn'
                    } else if (res.statusCode >= 500 || err) {
                        return 'error'
                    } else if (res.statusCode >= 300 && res.statusCode < 400) {
                        return 'silent'
                    }
                    return 'info'
                },
                customSuccessMessage: function (req, res) {
                    if (res.statusCode === 404) {
                        return 'resource not found'
                    }
                    return `${req.method} completed`
                },
                transport: {
                    target: 'pino-pretty',
                },
            },
        }),
        AuthModule,
        UserModule,
        ImagesModule
    ]
})

export class AppModule {}