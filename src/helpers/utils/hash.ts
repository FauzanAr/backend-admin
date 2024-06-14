import bcrypt from 'bcrypt';
import wrapper from './wrapper';
import logger from './logger';

const saltRound = 10;

export const hash = async (password: string) => {
    try {
        const salt = await bcrypt.genSalt(saltRound);
        const hash = await bcrypt.hash(password, salt);
        return wrapper.data(hash);
    } catch (error) {
        logger.error(`Error while hashing password: ${error}`);
        return wrapper.error('error while hashing password');
    }
}

export const compareHash = async (password: string, hashedPassword: string) => {
    try {
        const isMatch = await bcrypt.compare(password, hashedPassword);
        return wrapper.data(isMatch);
    } catch (error) {
        logger.error(`Error while comparing password: ${error}`);
        return wrapper.error('error while comparing password');
    }
}