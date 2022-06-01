import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from "@nestjs/common";
import {MyLogger} from "./common/Logger";

async function start() {
    let port = process.env.PORT || 5000
    const app = await NestFactory.create(
        AppModule,
        {
            logger: new MyLogger(),
        }
    );
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
        })
    )
    await app.listen(port);
}

start();
