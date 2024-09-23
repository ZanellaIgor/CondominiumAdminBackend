import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/infra/prisma.service';
import { CryptoService } from '../crypto/crypto.service'; // Serviço de criptografia

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private cryptoService: CryptoService, // Serviço de criptografia
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    // Aqui deveria ser feita a comparação de senhas, exemplo com bcrypt
    // if (user && bcrypt.compare(password, user.password)) return user;
    return user ? user : null;
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id };

    // Gera o token JWT
    const token = this.jwtService.sign(payload);

    // Dados que serão enviados ao frontend
    const dataToEncrypt = {
      access_token: token,
      isAdmin: user.role,
      condominioId: user.apartmentId,
    };

    // Criptografa os dados antes de enviá-los ao frontend
    const encryptedData = await this.cryptoService.encryptData(
      JSON.stringify(dataToEncrypt),
    );

    return encryptedData;
  }
}
