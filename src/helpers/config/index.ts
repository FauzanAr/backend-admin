import dotenv from 'dotenv';

dotenv.config();

const config = {
    port: process.env.PORT || 0,
    auth: {
        privateKey: process.env.PRIVATE_KEY || '',
    },
    brevo: {
        apiKey: process.env.BREVO_API_KEY || '',
    },
};

export default config;