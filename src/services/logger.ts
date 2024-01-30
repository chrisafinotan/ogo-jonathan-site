import { createLogger, transports } from 'winston';
import { globalObj } from '@/services/globalThis';

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6,
};
const createGlobalLogger = () => {
    const logger = createLogger({
        transports: [
            new transports.Console(),
            new transports.File({ filename: 'combined.log' }),
        ],
    });
    return logger;
};

export const logger = globalObj.logger ?? createGlobalLogger();

if (process.env.NODE_ENV !== 'production') globalObj.logger = logger;
