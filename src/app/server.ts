import express, {Express} from 'express';
import Request from '../helpers/interfaces/request';
import Response from '../helpers/interfaces/response';
import cors from 'cors';
import bodyParser from 'body-parser';
import logger from '../helpers/utils/logger';
import morgan from 'morgan';
import swagger from './swagger';
import middleware from '../helpers/auth/middleware';

import mysql from '../helpers/databases/mysql/connection';

import userApi from '../modules/user/handlers/api';
import transactionApi from '../modules/transaction/handlers/api';

class Server {
    server : Express

    constructor() {
        this.server = express();

        this.server.use(cors());
        this.server.use(bodyParser.json());
        this.server.use(morgan('tiny'));
        swagger(this.server);

        this.server.get('/', (req: Request, res: Response) => {
            res.send({'message': 'server up and running'});
        });

        // Modules Users
        this.server.post('/users/v1/login', userApi.userLogin);
        this.server.post('/users/v1/register', userApi.userRegister);
        this.server.post('/users/v1/send/otp', userApi.userSendOtp);
        this.server.get('/users/v1/me', middleware.verifyAuth, userApi.getUserDetail);
        this.server.get('/users/v1/account', middleware.verifyAuth, userApi.getUserByAccount);

        // Modules Transactions
        this.server.get('/transactions/v1', middleware.verifyAuth, transactionApi.getTransaction);
        this.server.get('/transactions/v1/count', middleware.verifyAuth, transactionApi.countTransaction);
        this.server.post('/transactions/v1/create', middleware.verifyAuth, middleware.makerOnly, transactionApi.createTransaction);
        this.server.put('/transactions/v1/update/:transactionId', middleware.verifyAuth, middleware.approverOnly, transactionApi.updateTransaction);
    }

    async init(port: number) {
        await Promise.all([
            mysql.init()
        ]);
        this.server.listen(port, () => {
            logger.info(`App running on port: ${port}`);
        });
    }
}

export default Server;