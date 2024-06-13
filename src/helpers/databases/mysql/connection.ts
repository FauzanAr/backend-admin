import { PrismaClient } from '@prisma/client';
import logger from '../../utils/logger';

let prisma = new PrismaClient();

const init = async () => {
  try {
    await prisma.$connect();
    logger.info('Connected to MySQL database using Prisma');
  } catch (error) {
    logger.error(`Error connecting to MySQL database: ${error}`);
    process.exit(1);
  }
};

const getConnection = async () => {
    if (!prisma) {
        await init();
    }

    return prisma;
}

export default {
  init,
  getConnection,
};
