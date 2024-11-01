import { UserRole } from './user.interface';

export interface NavItem {
  label: string;
  route: string;
  icon?: string;
  requiredRoles: UserRole[];
}
