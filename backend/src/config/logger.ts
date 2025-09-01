import winston, { format , transports} from 'winston';


const logger = winston.createLogger(
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

export default logger;
