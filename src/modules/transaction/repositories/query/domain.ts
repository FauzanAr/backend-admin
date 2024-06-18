import wrapper from "../../../../helpers/utils/wrapper";
import MySQL from "../../../../helpers/interfaces/mysql";
import Query from "./query";
import { GetTransaction } from "./query_model";

class TransactionDomain {
    private query: Query;

    constructor(mysql: MySQL) {
        this.query = new Query(mysql);
    }

    async getTransactions (payload: GetTransaction) {
        const querySearch = {
            status: ['']
        };
        if (payload.role === 'Approver') {
            querySearch.status = ['PENDING'];
        } else {
            querySearch.status = ['PENDING', 'APPROVED', 'REJECTED'];
        }

        const transactions = await this.query.getTransaction(querySearch)
        if (transactions.err) {
            return transactions
        }

        return wrapper.data(transactions.data);
    }

    async countTransaction () {
        const queryPending = {
            status: 'PENDING'
        }

        const queryApproved = {
            status: 'APPROVED'
        }

        const queryRejected = {
            status: 'REJECTED'
        }

        const [pending, approved, rejected] = await Promise.all([
            this.query.countTransactionByStatus(queryPending),
            this.query.countTransactionByStatus(queryApproved),
            this.query.countTransactionByStatus(queryRejected),
        ]);


        const data = {
            pending: pending.data || 0,
            approved: approved.data || 0,
            rejected: rejected.data || 0,
        }
    
        return wrapper.data(data);
    }
}

export default TransactionDomain;