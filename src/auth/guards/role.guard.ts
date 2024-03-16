import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../enum/userRoles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    console.log('Required Roles:', requiredRoles); // Log required roles
    const { user } = context.switchToHttp().getRequest();
    console.log("USER NAME", user);
    
    console.log('User Role:', user.role); // Log user role

    if (user.role === UserRole.ADMIN) {
      console.log('Admin Access Granted');
      return true;
    } else if (!requiredRoles) {
      console.log('No Required Roles Specified');
      return false;
    }
    const isAuthorized = requiredRoles.some((role) => user.role === role);
    console.log('Authorized:', isAuthorized);
    return isAuthorized;
  }
}
