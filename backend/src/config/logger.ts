import * as winston from 'winston';
const { format, transports } = winston;



class Logger {

    private static instance: winston.Logger;

    private constructor() { }

    public static getInstance(): winston.Logger {

        if (!Logger.instance) {
            Logger.instance = winston.createLogger(
                {
                    level: 'info',
                    format: format.combine(
                        format.timestamp(),
                        format.json()
                    ),
                    transports: [
                        new transports.Console(),
                        new transports.File({ filename: 'logs/standard.log' })
                    ],
                    exceptionHandlers: [
                        new transports.File({ filename: 'logs/exceptions.log' })
                    ],
                    rejectionHandlers: [
                        new transports.File({ filename: 'logs/rejections.log' })
                    ]
                }
            );
        }
        return Logger.instance;
    }

}

const logger = Logger.getInstance();
export default logger;
