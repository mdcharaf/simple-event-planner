import { Promoter } from '../db/models/promoter';

export interface IAuthSeevice {
  authenticate(promoterId: Number, token: string): Promise<boolean>;
};

class AuthService implements IAuthSeevice {

  async authenticate(promoterId: number, token: string): Promise<boolean> {
    const result: Promoter[] = await Promoter.findAll({
      where: {
        id: promoterId,
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