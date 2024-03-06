//role.decorator.ts

import { SetMetadata } from "@nestjs/common";
import { UserRole } from "../enum/userRoles.enum";


export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);