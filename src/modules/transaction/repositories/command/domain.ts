import MySQL from "../../../../helpers/interfaces/mysql"
import Query from "../query/query"
import Command from "./command"
import wrapper from "../../../../helpers/utils/wrapper"
import { CreateTransaction, UpdateTransaction } from "./command_model"
import BadRequestError from "../../../../helpers/error/bad_request_error"
import UserQuery from '../../../user/repositories/query/query';
import { Corporate } from '../../../../helpers/databases/mysql/connection';
import { generateString } from "../../../../helpers/utils/utils"
import moment from "moment"
import { CreateTransactionDB, CreateTransactionListDB, UpdateTransactionDB } from "../../utils/interfaces/command"
import { GetTransactionById } from "modules/transaction/utils/interfaces/query"

class TransactionDomain {
    private query: Query
    private command: Command
    private userQuery: UserQuery

    constructor(mysql: MySQL) {
        this.query = new Query(mysql);
        this.command = new Command(mysql);
        this.userQuery = new UserQuery(mysql);
    }

    async createTransaction(payload: CreateTransaction) {
        const issuerId = payload.issuerId;
        const list = payload.transactionList;
        const isSameId = list.find(val => val.userDestinationId === issuerId);
        if (isSameId) {
            return wrapper.error(new BadRequestError('Cannot send to your self!'));
        }

        const listDestinationId = new Set(list.map(val => Number(val.corporateDestinationId)));
        const listDestinationIdArr = Array.from(listDestinationId);
        const listCorporate = await this.userQuery.getCorporateByIds(listDestinationIdArr);
        const nonExistId = listDestinationIdArr.filter(val => !listCorporate.data.some((corp: Corporate) => corp.id === val));
        if(nonExistId.length > 0) {
            return wrapper.error(new BadRequestError(`Missing destination: ${nonExistId.length} account`));
        }

        let totalAmounts: number = 0;
        payload.transactionList.map(t => {
            totalAmounts = totalAmounts + t.amount
        });

        const transaction: CreateTransactionDB = {
            corporateId: Number(payload.corporateId),
            issuerId: Number(payload.issuerId),
            referenceId: generateString(25),
            status: payload.status,
            totalAmount: totalAmounts as any,
            type: payload.type,
            instruction: payload.instruction,
            transferAt: payload.instruction === 'IMMEDIATE' ? moment().toDate() : moment(payload.transferAt).toDate(),
        }

        const resultTransaction = await this.command.createTransaction(transaction);
        if (resultTransaction.err) {
            return resultTransaction;
        }

        const transactionList: CreateTransactionListDB[] = payload.transactionList.map(val => {
            return {
                amount: val.amount as any,
                corporateDestinationId: Number(val.corporateDestinationId),
                transactionId: resultTransaction.data.id,
                userDestinationId: Number(val.userDestinationId),
            }
        });

        const resultList = await this.command.createTransactionLists(transactionList);
        if (resultList.err) {
            return resultList;
        }

        const result = {
            totalTransfer: transactionList.length,
            totalAmount: transaction.totalAmount,
            issuerId: transaction.issuerId,
            instruction: transaction.instruction,
            type: transaction.type,
            referenceId: transaction.referenceId
        }

        return wrapper.data(result);
    }

    async updateTransaction(payload: UpdateTransaction) {
        const query: GetTransactionById = {
            id: Number(payload.transactionId)
        }
        const transactions = await this.query.getTransactionById(query)
        if (transactions.err || !transactions.data) {
            return wrapper.error(new BadRequestError('Failed to find transaction!'));
        }

        if (transactions.data.status !== 'PENDING') {
            return wrapper.error(new BadRequestError('Failed to update non pending record!'));
        }

        const queryUpdate: UpdateTransactionDB = {
            id: Number(payload.transactionId),
            status: payload.status,
        }
        const updated = await this.command.updateTransaction(queryUpdate);
        if(updated.err) {
            return updated;
        }

        return wrapper.data('success update transaction');
    }
}

export default TransactionDomain;