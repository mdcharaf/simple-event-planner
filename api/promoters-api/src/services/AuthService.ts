import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { IPromoter, Promoter } from '../db/models/promoter';

export interface IAuthSeevice {
  hashPassword(passwordString: string): Promise<string>;
  validatePassword(passwordString: string, passwordHash: string): Promise<boolean>;
  validateEmail(email: string): boolean;
  generateJWT(email: string, secret: string): string;
  authenticate(token: string, secret: string): Promise<boolean>;
  registerPromoter(username: string, email: string, password: string): Promise<IPromoter>;
  findPromoter(email: string): Promise<IPromoter>;
  updatePromoterToken(id: string, jwt: string): Promise<void>;
};


class AuthService implements IAuthSeevice {

  async registerPromoter(username: string, email: string, password: string): Promise<IPromoter> {
    const hashedPassword: string = await this.hashPassword(password);
    const jwt: string = this.generateJWT(email, process.env.SECRET as string);
    const result = Promoter.create({ username, email, password: hashedPassword, jwt });
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

  async authenticate(token: string, secret: string): Promise<boolean> {
    const result: Promoter[] = await Promoter.findAll({
      where: {
        jwt: token
      }
    });

    if (!result || result.length === 0) {
      return false;
    }

    return true;
  }

  async findPromoter(email: string): Promise<IPromoter> {
    console.log('test');
    
    const result: Promoter[]  = await Promoter.findAll({
      where: {
        email
      }
    });

    console.log('after');
    

    if (!result || result.length === 0) {
      return null as unknown as IPromoter;
    }

    return result[0] as IPromoter;
  }

  async updatePromoterToken(id: string, jwt: string) {
    const promoter: Promoter = await Promoter.findByPk(id);
    promoter.jwt = jwt;
    promoter.save();
  }
}

export function makeAuthService(): IAuthSeevice {
  return new AuthService();
}