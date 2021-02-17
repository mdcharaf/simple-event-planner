import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { IPromoter, Promotoer } from '../db/models/promoter';

export interface IAuthSeevice {
  hashPassword(passwordString: string): Promise<string>;
  validatePassword(passwordString: string, passwordHash: string): Promise<boolean>;
  validateEmail(email: string): boolean;
  generateJWT(email: string, secret: string): string;
  authenticate(token: string, secret: string): boolean;
  registerPromoter(username: string, email: string, password: string): Promise<IPromoter>;
};


class AuthService implements IAuthSeevice {

  async registerPromoter(username: string, email: string, password: string): Promise<IPromoter> {
    const hashedPassword: string = await this.hashPassword(password);
    const jwt: string = this.generateJWT(email, process.env.SECRET as string);
    const result = Promotoer.create({ username, email, password: hashedPassword, jwt });
    return result
  }

  async hashPassword(passwordString: string): Promise<string> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(passwordString, salt);
  }

  async validatePassword(passwordString: string, passwordHash: string): Promise<boolean> {
    return await bcrypt.compare(passwordString, passwordHash);
  }

  validateEmail(email: string): boolean {
    const regex: RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email.toLowerCase()));
  }

  generateJWT(email: string, secret: string): string {
    return jwt.sign(email, secret);
  }

  authenticate(token: string, secret: string): boolean {
    let authenticated: boolean = false;

    jwt.verify(token, secret, (err, _) => {
      authenticated = !err;
    });

    return authenticated;
  }
}

export function makeAuthService(): IAuthSeevice {
  return new AuthService();
}