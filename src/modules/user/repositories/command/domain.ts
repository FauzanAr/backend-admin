import moment from 'moment';
import MySQL from "../../../../helpers/interfaces/mysql";
import { UserRegister, UserSendOtp } from "./command_model";
import wrapper from "../../../../helpers/utils/wrapper";
import { hash } from "../../../../helpers/utils/hash";
import { CreateCorporate, CreateOTP, CreateUser, DeleteOTP } from "../../utils/interfaces/command";
import Command from "./command";
import { generate6DigitOtp } from "../../../../helpers/utils/utils";
import Query from '../query/query';
import { GetUserOtpByEmail } from '../../utils/interfaces/query';
import { UserOtp } from '../../../../helpers/databases/mysql/connection';
import BadRequestError from '../../../../helpers/error/bad_request_error';
import service, { SendOtpEmail } from '../../utils/service';

class User {
    private command: Command;
    private query: Query;

    constructor(mysql: MySQL) {
        this.command = new Command(mysql);
        this.query = new Query(mysql);
    }

    async userRegister(payload: UserRegister) {
        const query: GetUserOtpByEmail = {
            email: payload.email,
        }

        const otpData = await this.query.getUserOtp(query);
        if (otpData.err) {
            return otpData;
        }

        const otp: UserOtp = otpData.data;
        const today = moment();
        const expiredAt = moment(otp.expiredAt);
        if (today.isAfter(expiredAt)) {
            return wrapper.error(new BadRequestError('Your OTP has been expired! Please re-send the OTP!'))
        }

        if (payload.verifCode != otp.otp) {
            return wrapper.error(new BadRequestError('OTP Incorrect!'));
        }

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

        const deleteQuery: DeleteOTP = {
            email: payload.email,
        }
        this.command.deleteOtp(deleteQuery);

        return wrapper.data('success create user');
    }

    async sendOtp(payload: UserSendOtp) {
        const query: GetUserOtpByEmail = {
            email: payload.email
        }

        const existingOtp = await this.query.getUserOtp(query);
        if (existingOtp.data) {
            const data: UserOtp = existingOtp.data;
            const today = moment();
            const expiredDate = moment(data.expiredAt)
            if (today.isBefore(expiredDate)) {
                return wrapper.error(new BadRequestError('Please wait until your OTP expired before sending again!'));
            }
        }

        const otp = generate6DigitOtp();
        const expiredAt = moment().add(3, 'minutes').toDate();
        const document: CreateOTP = {
            email: payload.email,
            expiredAt: expiredAt,
            otp: otp,
        }

        const documentSendOtp: SendOtpEmail = {
            email: payload.email,
            otp: otp,
            userName: payload.userName,
        }

        await this.command.upsertOtp(document);

        service.sendOtpEmail(documentSendOtp);

        return wrapper.data('Send otp success!')
    }
}

export default User