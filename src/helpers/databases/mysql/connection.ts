import { PrismaClient, User, UserOtp, Corporate, Transaction, TransactionList } from '@prisma/client';
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

const getConnection = () => {
    return prisma;
};

// Interfaces
export { User, UserOtp, Corporate, Transaction, TransactionList }

export default {
  init,
  getConnection,
};
