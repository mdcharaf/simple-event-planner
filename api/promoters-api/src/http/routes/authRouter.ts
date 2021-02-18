import { Request, Response, Router } from 'express';
import { makeAuthService } from '../../services/authService';
import { AuthController } from '../controllers/authController';
import { auth } from '../middlewares/authMiddleware';

const router = Router();
const authController = new AuthController(makeAuthService());

router.post('/register', async (req: Request, res: Response) => {
  return await authController.register(req, res);
});

router.post('/login', async (req: Request, res: Response) => {
  return await authController.login(req, res);
});

router.post('/auth', async (req: Request, res: Response) => {
  return auth(req, res, () => { res.json({ auth: true })});
});

export const AuthRouter: Router = router;