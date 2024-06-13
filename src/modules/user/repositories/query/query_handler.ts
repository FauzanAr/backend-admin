import User from "./domain";
import connection from '../../../../helpers/databases/mysql/connection';
import { UserLogin } from "./query_model";

const user = new User(connection.getConnection())

const userLogin = async (payload: UserLogin) => {
    const getData = async () => {
        return await user.userLogin(payload)
    };

    const result = await getData();
    return result;
}

export default {
    userLogin,
}