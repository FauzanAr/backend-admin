import dotenv from 'dotenv';

dotenv.config();

const config = {
    port: process.env.PORT || 0,
    auth: {
        privateKey: process.env.PRIVATE_KEY || '',
    },
};

export default config;