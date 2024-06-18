import User from "./domain";
import connection from '../../../../helpers/databases/mysql/connection';
import { GetUserByAccount, UserLogin } from "./query_model";
import { GetUserDetailJWT } from "../../utils/interfaces/query";

const user = new User(connection.getConnection())

const userLogin = async (payload: UserLogin) => {
    const getData = async () => {
        return await user.userLogin(payload)
    };

    const result = await getData();
    return result;
}

const getUserData = async (payload: GetUserDetailJWT) => {
    const getData = async () => {
        return await user.getUserData(payload)
    };

    const result = await getData();
    return result;
}

const getUserByAccount = async (payload: GetUserByAccount) => {
    const getData = async () => {
        return await user.getUserByAccount(payload);
    };

    const result = await getData();
    return result;
}

export default {
    userLogin,
    getUserData,
    getUserByAccount,
}