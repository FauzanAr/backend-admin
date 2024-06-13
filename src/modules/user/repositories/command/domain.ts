import MySQL from "../../../../helpers/interfaces/mysql";
import { UserRegister } from "./command_model";
import wrapper from "../../../../helpers/utils/wrapper";

class User {
    constructor(mysql: MySQL) {}

    async userRegister(payload: UserRegister) {
        return wrapper.data('data');
    }
}

export default User