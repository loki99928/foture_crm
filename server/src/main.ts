import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from "@nestjs/common";
import {NestExpressApplication} from "@nestjs/platform-express";

async function start() {
    let port = process.env.PORT || 5000
    const app = await NestFactory.create<NestExpressApplication>(
        AppModule,
        {
            bufferLogs: true
        }
    );

    // todo-dv отключил подробное логирование
    // app.useLogger(app.get(Logger));

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
        })
    )
    app.enableCors()
    await app.listen(port);
}

start();
