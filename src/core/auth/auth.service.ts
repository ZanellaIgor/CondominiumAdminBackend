import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/infra/prisma.service';
import { CryptoService } from '../crypto/crypto.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private cryptoService: CryptoService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user ? user : null;
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id };

    const token = this.jwtService.sign(payload);

    const dataToEncrypt = {
      access_token: token,
      isAdmin: user.role === 'ADMIN',

      apartmentId: user.apartmentId,
    };

    const encryptedData = await this.cryptoService.encryptData(
      JSON.stringify(dataToEncrypt),
    );

    return encryptedData;
  }
}
