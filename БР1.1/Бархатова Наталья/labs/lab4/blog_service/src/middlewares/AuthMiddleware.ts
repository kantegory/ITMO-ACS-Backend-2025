import { ExpressMiddlewareInterface, ForbiddenError, UnauthorizedError } from 'routing-controllers';
import { AuthClient } from '../services/AuthClient';

export class AuthMiddleware implements ExpressMiddlewareInterface {
  private authClient = new AuthClient();

  async use(req: any, res: any, next: Function): Promise<any> {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      throw new UnauthorizedError('No token provided');
    }

    try {
      const user = await this.authClient.validateToken(token);
      req.user = user;
      next();
    } catch (error: any) {
      throw new ForbiddenError('Invalid token: ' + (error?.message || 'Unknown error'));
    }
  }
}
