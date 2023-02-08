import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from "@nestjs/common";
import {NestExpressApplication} from "@nestjs/platform-express";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function start() {
    let port = process.env.PORT || 5000
    const app = await NestFactory.create<NestExpressApplication>(
        AppModule,
        {
            bufferLogs: true
        }
    );

    // http://localhost:5000/api#/
    const config = new DocumentBuilder()
        .setTitle('Feature CRM')
        .setDescription('The CRM API')
        .setVersion('1.0')
        .addTag('crm')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

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
