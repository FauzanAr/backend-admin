import User from './domain';
import connection from '../../../../helpers/databases/mysql/connection';
import { UserRegister } from "./command_model";

const user = new User(connection.getConnection());

const userRegister = async (payload: UserRegister) => {
    const createData = async () => {
        return await user.userRegister(payload);
    };
    
    const result = await createData();
    return result;
}

export default {
    userRegister,
}