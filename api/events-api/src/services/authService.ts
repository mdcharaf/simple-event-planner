import { Promoter } from '../db/models/promoter';

export interface IAuthSeevice {
  authenticate(token: string): Promise<boolean>;
};

class AuthService implements IAuthSeevice {

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
}

export function makeAuthService(): IAuthSeevice {
  return new AuthService();
}