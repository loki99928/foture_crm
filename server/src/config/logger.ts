export const settingsLog = {
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
}