import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import * as swaggerDocument from '../documentation/swagger.json';

export default (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};