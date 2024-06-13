import MySQL from "../../../../helpers/interfaces/mysql";
import Query from "./query";
import wrapper from "../../../../helpers/utils/wrapper";
import { UserLogin } from "./query_model";

class User {
    private query: Query;

    constructor(mysql: MySQL) {
        this.query = new Query(mysql);
    }

    async userLogin (payload: UserLogin) {
        return wrapper.data({'data': 'data'})
    }
}

export default User;