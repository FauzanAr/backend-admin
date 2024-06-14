import BadRequestError from "../../../../helpers/error/bad_request_error";
import NotFoundError from "../../../../helpers/error/not_found_error";
import MySQL from "../../../../helpers/interfaces/mysql";
import wrapper from "../../../../helpers/utils/wrapper";
import { GetUserByEmail, GetUserByUserIdAndCorporateId, GetUserOtpByEmail } from "../../utils/interfaces/query";

class Query {
    private mysql: MySQL;

    constructor(mysql: MySQL) {
        this.mysql = mysql;
    }

    async getUserByEmail(payload: GetUserByEmail) {
        try {
            const result = await this.mysql.user.findUnique({
                where: {
                    email: payload.email
                }
            })
    
            if (!result) {
                return wrapper.error(new NotFoundError(''))
            }
            
            return wrapper.data(result);
        } catch (error) {
            return wrapper.error(new BadRequestError('Failed to get user!'));
        }
    }

    async getUserByUserIdAndCorporateId(payload: GetUserByUserIdAndCorporateId) {
        try {
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
        } catch (error) {
            return wrapper.error(new BadRequestError('Failed to get user!'));
        }
    }

    async getUserOtp(payload: GetUserOtpByEmail) {
        try {
            const result = await this.mysql.userOtp.findUnique({
                where: {
                    email: payload.email
                },
            });
    
            if (!result) {
                return wrapper.error(new NotFoundError('OTP Not found!'));
            }
    
            return wrapper.data(result);
        } catch (error) {
            return wrapper.error(new BadRequestError('Failed to get otp!'));
        }
    }
}

export default Query;