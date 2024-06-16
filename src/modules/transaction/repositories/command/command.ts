import { CreateTransactionDB, CreateTransactionListDB, UpdateTransactionDB } from "../../utils/interfaces/command";
import MySQL from "../../../../helpers/interfaces/mysql";
import wrapper from "../../../../helpers/utils/wrapper";
import { handlePrismaError } from "../../../../helpers/utils/prisma-error";
import BadRequestError from "../../../../helpers/error/bad_request_error";

class Command {
    private mysql: MySQL;

    constructor(mysql: MySQL) {
        this.mysql = mysql;
    }

    async createTransaction (payload: CreateTransactionDB) {
        try {
            const result = await this.mysql.transaction.create({
                data: {
                    instruction: payload.instruction,
                    referenceId: payload.referenceId,
                    status: payload.status,
                    totalAmount: payload.totalAmount,
                    type: payload.type,
                    corporateId: payload.corporateId,
                    issuerId: payload.issuerId,
                    transferAt: payload.transferAt,
                }
            });

            return wrapper.data(result);
        } catch (error) {
            handlePrismaError(error);
            return wrapper.error(new BadRequestError('Error while creating transaction!'));
        }
    }

    async createTransactionLists (payload: CreateTransactionListDB[]) {
        try {
            const result = await this.mysql.transactionList.createMany({
                data: payload
            });

            return wrapper.data(result);
        } catch (error) {
            handlePrismaError(error);
            return wrapper.error(new BadRequestError('Error while creating transaction list!'));
        }
    }

    async updateTransaction (payload: UpdateTransactionDB) {
        try {
            const result = await this.mysql.transaction.update({
                where: {
                    id: payload.id
                },
                data: {
                    status: payload.status
                }
            });

            return wrapper.data(result);
        } catch (error) {
            handlePrismaError(error);
            return wrapper.error(new BadRequestError('Error while update transaction!'));
        }
    }
}

export default Command;