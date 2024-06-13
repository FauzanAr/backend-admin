import express, {Express} from 'express';
import Request from '../helpers/interfaces/request';
import Response from '../helpers/interfaces/response';
import cors from 'cors';
import bodyParser from 'body-parser';

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
        
    }

    async init(port: number) {
        this.server.listen(port, () => {
            console.log(`App running on port: ${port}`);
        });
    }
}

export default Server;