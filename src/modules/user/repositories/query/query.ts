import NotFoundError from "../../../../helpers/error/not_found_error";
import MySQL from "../../../../helpers/interfaces/mysql";
import wrapper from "../../../../helpers/utils/wrapper";
import { GetUserByEmail, GetUserByUserIdAndCorporateId } from "../../utils/interfaces/query";

class Query {
    private mysql: MySQL;

    constructor(mysql: MySQL) {
        this.mysql = mysql;
    }

    async getUserByEmail(payload: GetUserByEmail) {
        const result = await this.mysql.user.findUnique({
            where: {
                email: payload.email
            }
        })

        if (!result) {
            return wrapper.error(new NotFoundError(''))
        }
        
        return wrapper.data(result);
    }

    async getUserByUserIdAndCorporateId(payload: GetUserByUserIdAndCorporateId) {
        const result = await this.mysql.user.findUnique({
            where: {
                userId: payload.userId,
                corporateId: payload.corporateId,
            },
        });

        if (!result) {
            return wrapper.error(new NotFoundError(''));
        }

        return wrapper.data(result);
    }
}

export default Query;