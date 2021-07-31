import jwt from 'jsonwebtoken';

// based on jwt.js in the Alchemy foundations BE bootstrap

const APP_SECRET = process.env.APP_SECRET || 'thisisnotthesecret';

export const sign = (profile: Record<string, string>): string => {
    return jwt.sign({ id: profile.id }, APP_SECRET);
};

export const verify = (token: string): string | jwt.JwtPayload => {
    return jwt.verify(token, APP_SECRET);
};
