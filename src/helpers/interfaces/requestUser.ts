import { Request } from "express";
import { GetUserDetailJWT } from "modules/user/utils/interfaces/query";
export default interface RequestUser extends Request {
    user?: GetUserDetailJWT
};