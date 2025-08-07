const expressWinston = require('express-winston');
const { format, transports, createLogger } = require('winston');
const winstonMongoDB = require('winston-mongodb');
const env = require('../env');

const customFormat = format.combine(
	format.timestamp(),
	format.printf(({ timestamp, level, message, ...metadata }) => {
		const meta = metadata.meta || {};
		const req = meta.req || {};
		const res = meta.res || {};
		return `${timestamp} [${level.toUpperCase()}]: ${message} ${JSON.stringify(req.headers)} ${JSON.stringify(req.body)} ${JSON.stringify(res)}`;
	})
);
const consoleFormat = format.combine(
	format.timestamp(),
	format.printf(({ timestamp, level, message, ...metadata }) => {
		const meta = metadata.meta || {};
		return `${timestamp} [${level.toUpperCase()}]: ${message} ${JSON.stringify(meta.req?.headers)} ${JSON.stringify(meta.req?.body)} ${JSON.stringify(meta.res)}`;
	}),
	format.prettyPrint({ colorize: true })
);

const logger = expressWinston.logger({
	transports:
		env.NODE_ENV === 'development'
			? [new transports.Console({ format: consoleFormat })]
			: [
					//   new transports.File({ filename: path.join(__dirname, "../../logs/warnings.log"), level: "warn" }),
					// new transports.File({filename:'logs/combined.log',level:'info'}),
					// new transports.File({filename:'logs/error.log',level:'error'}),
					// new transports.File({ filename: 'logs/warnings.log', level: 'warn' }),
					new winstonMongoDB.MongoDB({
						level: 'warn',
						db: env.MONGO_URI,
						collection: 'logs',
						capped: true,
						cappedMax: 1024 * 1024 * 5,
						format: format.combine(format.timestamp(), format.json())
					})
				],
	statusLevels: true,
	format: customFormat,
	meta: true,
	requestWhitelist: ['headers', 'body'],
	responseWhitelist: ['body']
});
const collectLog = createLogger({
    level: 'info',
    transports: [
        new transports.Console({ format: consoleFormat }),
        env.NODE_ENV !== 'development' &&
        new winstonMongoDB.MongoDB({
            db: env.MONGO_URI,
            collection: 'logs',
            level: 'warn',
            format: format.combine(format.timestamp(), format.json())
        })
    ].filter(Boolean)
});
module.exports = { logger,collectLog  };
