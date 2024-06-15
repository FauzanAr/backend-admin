import Transaction from './domain';
import connection from '../../../../helpers/databases/mysql/connection';
import { GetTransaction } from './query_model';

const transaction = new Transaction(connection.getConnection())

const getTransaction = async (payload: GetTransaction) => {
    const getData = async () => {
        return await transaction.getTransactions(payload)
    };

    const result = await getData();
    return result;
}

const countTransaction = async () => {
    const getData = async () => {
        return await transaction.countTransaction()
    };

    const result = await getData();
    return result;
}

export default {
    getTransaction,
    countTransaction,
}