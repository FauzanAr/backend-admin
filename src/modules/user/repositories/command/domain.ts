import MySQL from "../../../../helpers/interfaces/mysql";
import { UserRegister } from "./command_model";
import wrapper from "../../../../helpers/utils/wrapper";
import { hash } from "../../../../helpers/utils/hash";
import { CreateCorporate, CreateUser } from "../../utils/interfaces/command";
import Command from "./command";

class User {
    private command: Command;

    constructor(mysql: MySQL) {
        this.command = new Command(mysql);
    }

    async userRegister(payload: UserRegister) {
        const hashedPassword = await hash(payload.password);
        if (hashedPassword.err) {
            return hashedPassword;
        }

        const documentCorporate: CreateCorporate = {
            id: Number(payload.corporateId),
            name: payload.corporateName,
        }

        const document: CreateUser = {
            userId: payload.userId,
            corporateId: Number(payload.corporateId),
            email: payload.email,
            name: payload.userName,
            password: hashedPassword.data,
            phoneNumber: payload.phoneNumber,
            role: payload.role,
        }

        const createCorporate = await this.command.createCompany(documentCorporate);
        if (createCorporate.err) {
            return createCorporate
        }

        const createUser = await this.command.createUser(document);
        if (createUser.err) {
            return createUser;
        }

        return wrapper.data('success create user');
    }
}

export default User