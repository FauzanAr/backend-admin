import { CreateCorporate, CreateUser } from "../../utils/interfaces/command";
import MySQL from "../../../../helpers/interfaces/mysql";
import wrapper from "../../../../helpers/utils/wrapper";
import BadRequestError from "../../../../helpers/error/bad_request_error";
import logger from "../../../../helpers/utils/logger";
import { handlePrismaError } from "../../../../helpers/utils/prisma-error";

class Command {
    private mysql: MySQL;

    constructor(mysql: MySQL) {
        this.mysql = mysql;
    }

    async createCompany(payload: CreateCorporate) {
        try {
            const result = await this.mysql.corporate.create({
                data: {
                    id: payload.id,
                    name: payload.name,
                },
            });
    
            return wrapper.data(result);
        } catch (error) {
            const errorType = handlePrismaError(error);
            if(errorType.type === 'PRISMA_DUPLICATE_ERROR') {
                return wrapper.data({});
            }

            return wrapper.error(new BadRequestError('Error while saving corporate!'));
        }
    }

    async createUser(payload: CreateUser) {
        try {
            const result = await this.mysql.user.create({
                data: {
                    userId: payload.userId,
                    corporateId: payload.corporateId,
                    name: payload.name,
                    role: payload.role,
                    phoneNumber: payload.phoneNumber,
                    email: payload.email,
                    password: payload.password,
                }
            });

            return wrapper.data(result);            
        } catch (error) {
            const errorType = handlePrismaError(error);
            if(errorType.type === 'PRISMA_DUPLICATE_ERROR') {
                if(errorType.message.includes('User_userId_key')) {
                    return wrapper.error(new BadRequestError('Duplicate userId!'));
                }

                if (errorType.message.includes('User_phoneNumber_key')) {
                    return wrapper.error(new BadRequestError('Duplicate phone number!'));
                }

                if (errorType.message.includes('User_email_key')) {
                    return wrapper.error(new BadRequestError('Duplicate email!'));
                }

                return wrapper.error(new BadRequestError('Duplicate Data'));
            }

            return wrapper.error(new BadRequestError('Error while saving user!'));
        }
    }
}

export default Command;