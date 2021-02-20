import { Request, Response } from 'express';
import { IPromoter } from '../../db/models/promoter';
import { IAuthSeevice } from '../../services/authService';

export class AuthController {
  private readonly authService: IAuthSeevice;

  constructor(authService: IAuthSeevice) {
    this.authService = authService;
  }

  async register(req: Request, res: Response) {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    try {
      await this.authService.CheckUsernameAndEmail(username, email);
      await this.authService.CheckPassword(password);
    } catch (error) {
      return res.status(422).json({ error: error.message });
    }

    try {
      const promoter = await this.authService.registerPromoter(username, email, password);
      return res.status(200).json({
        data: {
          username: promoter.username,
          email: promoter.email,
        }
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
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

    const promoter: IPromoter = await this.authService.findPromoter(email);
    if (!promoter) {
      return res.status(401).json({ auth: false, message: 'Promoter was not found..' });
    }

    const isAuthenticated: boolean = await this.authService.validatePassword(password, promoter.password);

    if (!isAuthenticated) {
      return res.status(401).json({ auth: false, message: 'Invalid email or password' });
    }

    const jwt: string = this.authService.generateToken();
    await this.authService.updatePromoterToken(promoter.id.toString(), jwt);

    return res.status(200).json({ auth: true, userId: promoter.id, token: jwt })
  }
}