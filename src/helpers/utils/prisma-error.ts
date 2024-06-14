import { Prisma } from "@prisma/client";
import logger from "./logger";

export const handlePrismaError = (e: any) => {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
            return {type: 'PRISMA_DUPLICATE_ERROR', message: e.message}
        }

        logger.info(`CODE: ${e.code} | MESSAGE: ${e.message} | NAME: ${e.name} | NOT_HANDLED`);
        return {type: 'PRISMA_NOT_HANDLED_ERROR', message: ''}
    }

    return {type: 'NOT_PRISMA_ERROR', message: ''};
}