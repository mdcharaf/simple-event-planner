import * as bcrypt from 'bcrypt';
import * as Randomstring from 'randomstring';
import { Sequelize } from 'sequelize/types';
import { IPromoter, Promoter } from '../db/models/promoter';

export interface IAuthSeevice {
  hashString(passwordString: string): Promise<string>;
  validatePassword(passwordString: string, passwordHash: string): Promise<boolean>;
  validateEmail(email: string): boolean;
  generateToken(): string;
  authenticate(token: string): Promise<boolean>;
  registerPromoter(username: string, email: string, password: string): Promise<IPromoter>;
  findPromoter(email: string): Promise<IPromoter>;
  updatePromoterToken(id: string, jwt: string): Promise<void>;
  CheckUsernameAndEmail(username: string, email: string): Promise<void>;
  CheckPassword(password: string): Promise<void>;
};


class AuthService implements IAuthSeevice {

  async registerPromoter(username: string, email: string, password: string): Promise<IPromoter> {
    const hashedPassword: string = await this.hashString(password);
    const jwt: string = this.generateToken();
    Promoter.create({
      username,
      email,
      password: hashedPassword,
      jwt
    });
    return { username, email, jwt } as IPromoter;
  }

  async hashString(passwordString: string): Promise<string> {
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

  generateToken(): string {
    return Randomstring.generate({ length: 20 });
  }

  async authenticate(token: string): Promise<boolean> {
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
    const result: Promoter[] = await Promoter.findAll({
      where: {
        email
      }
    });

    if (!result || result.length === 0) {
      return null as unknown as IPromoter;
    }

    return result[0] as IPromoter;
  }

  async updatePromoterToken(id: string, jwt: string) {
    const promoter: Promoter = await Promoter.findByPk(id) as Promoter;
    promoter.jwt = jwt;
    promoter.save();
  }

  async CheckUsernameAndEmail(username: string, email: string): Promise<void> {
    if (!username || username.length < 3) {
      throw new Error("Username length should be greater than 2");
    }

    if (!email || email.length < 3) {
      throw new Error("Email length should be greater than 2");
    }

    let result: Promoter[] = await Promoter.findAll({
      where: {
        email
      }
    });
    if (result.length > 0) {
      throw new Error("Email already exist");
    }

    result = await Promoter.findAll({
      where: {
        username
      }
    });
    if (result.length > 0) {
      throw new Error("Username already exist");
    }
  }

  async CheckPassword(password: string): Promise<void> {
    if (password.length < 6) {
      throw new Error("Password length should be greater that 5");
    }
  }
}

export function makeAuthService(): IAuthSeevice {
  return new AuthService();
}