import { Request, Response } from 'express';
import { IPromoter } from '../../db/models/promoter';
import { IAuthSeevice } from '../../services/AuthService';

export class AuthController {
  private readonly authService: IAuthSeevice;

  constructor(authService: IAuthSeevice) {
    this.authService = authService;
  }

  async register(req: Request, res: Response) {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    if (!username || username.length < 3) {
      return res.status(400).json({ message: 'Invalid Username (Length must be greater than 2)' });
    }

    if (!email || !this.authService.validateEmail(email)) {
      return res.status(400).json({ message: 'Email is required or malformed.' });
    }

    if (!password || password.length < 6) {
      return res.status(400).json({ message: 'Email is required or malformed.' });
    }

    const promoter = await this.authService.registerPromoter(username, email, password);

    res.status(200).json({
      data: {
        username: promoter.username,
        email: promoter.email,
        jwt: promoter.jwt
      }
    });
  }

  async login(req: Request, res: Response) {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !this.authService.validateEmail(email)) {
      return res.status(400).json({ auth: false, message: 'Email is required or malformed.' });
    }

    if (!password) {
      return res.status(400).json({ auth: false, message: 'Password is required' });
    }

  }
}