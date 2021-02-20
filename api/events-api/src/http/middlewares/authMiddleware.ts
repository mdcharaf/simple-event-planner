import { NextFunction, Request, Response } from 'express';
import { makeAuthService } from '../../services/authService';

const authService = makeAuthService();

export async function auth(req: Request, res: Response, next: NextFunction) {
  if (!req.headers || !req.headers.authorization) {
    return res.status(401).send({ message: 'No authorization headers.' });
  }

  const tokenBearer = req.headers.authorization.split(' ');
  if (tokenBearer.length != 2) {
    return res.status(401).send({ message: 'Malformed token.' });
  }

  const token = tokenBearer[1];
  if (!(await authService.authenticate(token))) {
    return res.status(403).json({ auth: false, message: 'Failed to authenticate.' });
  }

  return next();
}