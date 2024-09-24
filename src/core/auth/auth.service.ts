import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/infra/prisma.service';
import { CryptoService } from '../crypto/crypto.service';

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
    private cryptoService: CryptoService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserResponse | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
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
    const payload = { email: user.email, sub: user.id };

    const token = this.jwtService.sign(payload);

    const dataToEncrypt = {
      access_token: token,
      isAdmin: user.role === 'ADMIN',
      condominiumIds: user.condominiums?.map((condominium) => condominium.id),
      apartmentIds: user.apartments?.map((apartment) => apartment.id),
    };

    const encryptedData = await this.cryptoService.encryptData(
      JSON.stringify(dataToEncrypt),
    );

    return encryptedData;
  }
}
