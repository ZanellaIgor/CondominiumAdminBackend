import { Role } from '@prisma/client';

export interface IUserToken {
  userId: number;
  role: Role;
  name: string;
  condominiumIds?: number[];
  apartmentIds?: number[];
}
