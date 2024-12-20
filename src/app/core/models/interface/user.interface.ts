export const UserRoles = {
  USER: 'user',
  ADMIN: 'admin',
  TEACHER: 'teacher',
  STUDENT: 'student',
} as const;

export type UserRole = (typeof UserRoles)[keyof typeof UserRoles];

export interface User {
  uid: string;
  email: string | null;
  displayName?: string | null;
  role?: UserRole;
  createdAt?: Date;
  lastLogin?: Date;
}
