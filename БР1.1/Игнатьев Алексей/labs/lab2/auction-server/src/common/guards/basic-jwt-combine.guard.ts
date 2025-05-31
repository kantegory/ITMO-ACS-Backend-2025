import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { BasicAuthGuard } from './basic-auth.guard';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { Observable } from 'rxjs';

@Injectable()
export class BasicJwtCombineGuard implements CanActivate {
  constructor(
    @Inject(JwtAuthGuard)
    private jwtAuthGuard: JwtAuthGuard, // Guard для Bearer
    @Inject(BasicAuthGuard)
    private basicAuthGuard: BasicAuthGuard, // Guard для Basic
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (request.headers['authorization']?.startsWith('Bearer ')) {
      const canActivate = this.jwtAuthGuard.canActivate(context);
      if (canActivate instanceof Observable) {
        return !!(await canActivate.toPromise());
      }
      return canActivate;
    }

    if (request.headers['authorization']?.startsWith('Basic ')) {
      const canActivate = this.basicAuthGuard.canActivate(context);
      if (canActivate instanceof Observable) {
        return !!(await canActivate.toPromise());
      }
      return canActivate;
    }

    return true;
  }
}
