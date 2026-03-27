export const USER_ROLE = {
  ADMIN: 'ADMIN',
  SUPER_ADMIN: 'SUPER_ADMIN',
} as const;

export type UserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];

export const USER_ROLES = Object.values(USER_ROLE) as [UserRole, ...UserRole[]];

export function isSuperAdmin(role: UserRole): boolean {
  return role === USER_ROLE.SUPER_ADMIN;
}
