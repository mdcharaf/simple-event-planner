import { Request, Response, Router } from 'express';
import { makeAuthService } from '../../services/AuthService';
import { AuthController } from '../controllers/authController';

const router = Router();
const authController = new AuthController(makeAuthService());

router.post('/register', async (req: Request, res: Response) => {
  return authController.register(req, res);
});

export const AuthRouter: Router = router;