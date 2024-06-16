import Transaction from "./domain";
import connection from "../../../../helpers/databases/mysql/connection";
import { CreateTransaction, UpdateTransaction } from "./command_model";

const transaction = new Transaction(connection.getConnection());

const createTransaction = async (payload: CreateTransaction) => {
    const createData = async () => {
        return await transaction.createTransaction(payload);
    };
    
    const result = await createData();
    return result;
}

const updateTransaction = async (payload: UpdateTransaction) => {
    const updateData = async () => {
        return await transaction.updateTransaction(payload);
    };
    
    const result = await updateData();
    return result;
}

export default {
    createTransaction,
    updateTransaction,
}