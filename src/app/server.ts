import express, {Express} from 'express';
import Request from '../helpers/interfaces/request';
import Response from '../helpers/interfaces/response';
import cors from 'cors';
import bodyParser from 'body-parser';
import logger from '../helpers/utils/logger';

import mysql from '../helpers/databases/mysql/connection';

import userApi from '../modules/user/handlers/api';

class Server {
    server : Express

    constructor() {
        this.server = express();

        this.server.use(cors());
        this.server.use(bodyParser.json());

        this.server.get('/', (req: Request, res: Response) => {
            res.send({'message': 'server up and running'});
        });

        // Modules Users
        this.server.post('/users/v1/login', userApi.userLogin);
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