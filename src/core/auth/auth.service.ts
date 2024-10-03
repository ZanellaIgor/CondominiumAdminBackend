import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/infra/prisma.service';

interface UserResponse {
  id: number;
  name: string;
  email: string;
  role: string;
  apartments: {
    id: number;
    name: string;
  }[];
  condominiums: {
    id: number;
    name: string;
  }[];
}

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserResponse | null> {
    const user = await this.prisma.user.findUnique({
      where: { email, password },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        apartments: {
          select: {
            id: true,
            name: true,
          },
        },
        condominiums: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return user ? user : null;
  }

  async login(user: UserResponse) {
    const payload = {
      email: user.email,
      id: user.id,
      role: user.role,
      condominiumIds: user.condominiums?.map((condominium) => condominium.id),
      apartmentIds: user.apartments?.map((apartment) => apartment.id),
    };

    const dataJWT = { acess_token: this.jwtService.sign(payload) };

    return dataJWT;
  }
}
