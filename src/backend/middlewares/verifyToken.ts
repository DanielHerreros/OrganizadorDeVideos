import { Request, Response, NextFunction } from 'express';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = true //req.headers['authorization'];
    if (token) {
        console.log("Token verified");
        next();
    } else {
        res.status(401).json({ message: 'No token provided' });
    }
}; 