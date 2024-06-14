import { sendEmail } from "../../../helpers/mailing/brevo";
import { SendEmail } from "../../../helpers/interfaces/brevo"

export interface SendOtpEmail {
    email: string,
    otp: string,
    userName: string,
}

const sendOtpEmail = async (payload: SendOtpEmail) => {
    const body: SendEmail = {
        params: {
            otp: payload.otp,
            userName: payload.userName,
        },
        subject: 'Verification Code',
        to: [
            {email: payload.email, name: payload.userName}
        ]
    };

    const result = await sendEmail(body);
    return result
}

export default {
    sendOtpEmail,
}