import { CountTransaction, GetTransaction, GetTransactionById } from "../../utils/interfaces/query";
import MySQL from "../../../../helpers/interfaces/mysql";
import wrapper from "../../../../helpers/utils/wrapper";
import NotFoundError from "../../../../helpers/error/not_found_error";
import BadRequestError from "../../../../helpers/error/bad_request_error";
import logger from "../../../../helpers/utils/logger";

class Query {
    private mysql: MySQL;

    constructor(mysql: MySQL) {
        this.mysql = mysql;
    }

    async getTransaction (payload: GetTransaction) {
        try {
            const result = await this.mysql.transaction.findMany({
                where: {
                    status: {
                        in: payload.status
                    }
                },
                include: {
                    TransactionList: {
                        include: {
                            corporateDestination:{
                                select: {
                                    name: true
                                }
                            },
                            userDestination: {
                                select: {
                                    name: true
                                }
                            }
                        }
                    },
                    issuer: {
                        select: {
                            name: true
                        }
                    },
                    corporate: {
                        select: {
                            name: true
                        }
                    }
                }
            });

            return wrapper.data(result);
        } catch (error) {
            logger.error(`Error while get transaction: ${error}`);
            return wrapper.error(new NotFoundError('No transaction found!'));
        }
    }

    async getTransactionById (payload: GetTransactionById) {
        try {
            const result = await this.mysql.transaction.findUnique({
                where: {
                    id: payload.id
                }
            })

            return wrapper.data(result);
        } catch (error) {
            logger.error(`Error while get transaction by id: ${error}`);
            return wrapper.error(new BadRequestError('Failed to count transaction'))
        }
    }

    async countTransactionByStatus (payload: CountTransaction) {
        try {
            const result = await this.mysql.transaction.count({
                where: {
                    status: payload.status
                }
            });

            return wrapper.data(result);            
        } catch (error) {
            logger.error(`Error while count ${payload.status} transaction: ${error}`);
            return wrapper.error(new BadRequestError('Failed to count transaction'))
        }
    }
}

export default Query;