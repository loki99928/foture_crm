import {EjsAdapter} from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';

export const getMailConfig = async (): Promise<any> => {
    return {
        transport: {
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            secure: true,
            auth: {
                user: process.env.MAIL_AUTH_USER,
                pass: process.env.MAIL_AUTH_PASSWORD,
            },
        },
        defaults: {
            from: `"No Reply" <${process.env.MAIL_FROM_NAME}>`,
        },
        template: {
            dir: process.cwd() + '/dist/templates/',
            adapter: new EjsAdapter(),
            options: {
                strict: true,
            },
        },
    };
};