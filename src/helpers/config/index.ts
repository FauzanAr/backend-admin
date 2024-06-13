import dotenv from 'dotenv';

dotenv.config();

const config = {
    port: process.env.PORT || 0,
};

export default config;