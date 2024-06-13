import Server from './src/app/server';
import config from './src/helpers/config';

const server = new Server();

server.init(Number(config.port));