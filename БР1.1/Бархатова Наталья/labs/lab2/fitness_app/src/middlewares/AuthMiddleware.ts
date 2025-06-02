import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';
import { BadRequestError } from 'routing-controllers';
import { AuthService } from '../services/AuthService';

export class AuthMiddleware implements ExpressMiddlewareInterface {
  private authService = new AuthService();

  async use(req: any, res: any, next: Function): Promise<any> {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
      throw new BadRequestError('No token provided');
    }

    try {
      const decoded = this.authService.validateToken(token);
      req.user = decoded;
      next();
    } catch (error) {
      throw new BadRequestError('Invalid token');
    }
  }
}
