import MySQL from "../../../../helpers/interfaces/mysql";
import Query from "./query";
import wrapper from "../../../../helpers/utils/wrapper";
import { GetUserByAccount, UserLogin } from "./query_model";
import { GetUserByUserIdAndCorporateId, GetUserDetailJWT } from "modules/user/utils/interfaces/query";
import { compareHash } from "../../../../helpers/utils/hash";
import { User } from '../../../../helpers/databases/mysql/connection';
import UnauthorizedError from "../../../../helpers/error/unauthorized_error";
import jwt from '../../../../helpers/auth/middleware';

class QueryDomain {
    private query: Query;

    constructor(mysql: MySQL) {
        this.query = new Query(mysql);
    }

    async userLogin (payload: UserLogin) {
        const query: GetUserByUserIdAndCorporateId = {
            userId: payload.userId,
            corporateId: Number(payload.corporateId),
        }

        const user = await this.query.getUserByUserIdAndCorporateId(query);
        if (user.err) {
            return user;
        }

        const data: User = user.data;
        const compared = await compareHash(payload.password, data.password);
        if (compared.err || !compared.data ) {
            return wrapper.error(new UnauthorizedError('Password not match!'));
        }

        const jwtBody = {
            id: data.id,
            userId: data.userId,
            corporateId: data.corporateId,
            name: data.name,
            role: data.role,
            phoneNumber: data.phoneNumber,
            email: data.email,
            lastLoginAt: data.lastLoginAt,
        };
        const token = jwt.generateToken(jwtBody)
        return wrapper.data(token)
    }

    async getUserData(payload: GetUserDetailJWT) {
        delete payload.iat;
        delete payload.exp;

        return wrapper.data(payload);
    }

    async getUserByAccount(payload: GetUserByAccount) {
        const query = {
            corporateId: Number(payload.accountNo),
        }
        const result = await this.query.getUserByCorporateId(query);
        if (result.err) {
            return result;
        }

        return wrapper.data(result.data);
    }
}

export default QueryDomain;