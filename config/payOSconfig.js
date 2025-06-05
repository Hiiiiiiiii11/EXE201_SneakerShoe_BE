import PayOS from '@payos/node';

export const payOS = new PayOS(
    'YOUR_PAYOS_CLIENT_ID',
    'YOUR_PAYOS_API_KEY',
    'YOUR_PAYOS_CHECKSUM_KEY'
);
