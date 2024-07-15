import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { JWT } from '@config/authentication';
import { HttpStatus } from '@utils/http-status';
import HttpStatusError from '@shared/errors/HttpStatusError';

interface Token {
    iat: number;
    exp: number;
    sub: string;
    roles: string[];
}

export default function authenticationCheck(
    request: Request,
    response: Response,
    next: NextFunction,
): void {
    const header = request.headers.authorization;

    if (!header) {
        throw new HttpStatusError(
            'JWT não esta presente no header.',
            HttpStatus.UNAUTHORIZED,
        );
    }

    const [, token] = header.split(' ');

    try {
        const decoded = verify(token, JWT.SECRET);
        const { sub: id } = decoded as Token;
        request.user = { id };

        return next();
    } catch {
        throw new HttpStatusError(
            'Token expirado ou invalido.',
            HttpStatus.UNAUTHORIZED,
        );
    }
}
