import winston, { format } from 'winston';


const logger = winston.createLogger(
    {
        level: 'info',
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json()
        ),
        transports: [
            new winston.transports.Console(), 
            new winston.transports.File({ filename: 'logs/standard.log' })
        ],
        exceptionHandlers: [
            new winston.transports.Console(),
            new winston.transports.File({ filename: 'logs/exceptions.log' })
        ],
        rejectionHandlers: [
            new winston.transports.Console(),
            new winston.transports.File({ filename: 'logs/rejections.log' })
        ]
    }
);

export default logger;
