import PayOS from '@payos/node';
import dotenv from 'dotenv';

dotenv.config();

export const payOS = new PayOS(
    process.env.CLIENT_ID,
    process.env.API_PAY_ID,
    process.env.CHECKSUM_KEY
);
