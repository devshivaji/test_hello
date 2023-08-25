import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { config } from 'dotenv';
config();

export const checkCompanyAuth = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies['token'];

    if (!token) {
        return res.status(400).json({ success: false, message: 'Token does not exist.' });
    }

    try {
        const payload = verify(token, process.env.JWT_SECRET_KEY!);

        if (!payload) {
            return res.status(409).json({ success: false, message: 'Invalid/Expired token.' });
        } else {
            res.locals.authPayload = payload;
            return next()
        }
    } catch (err) {
        res.status(409).json({ success: false, message: 'Invalid/Expired token.' })
    }
};
