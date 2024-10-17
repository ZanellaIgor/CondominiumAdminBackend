import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/infra/prisma.service';
import { LoginDto } from './dto/login.dto';
import { HashingServiceProtocol } from './hashing/hashing.service';
import jwtConfig from './jwt/jwt.config';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hashService: HashingServiceProtocol,
    @Inject(jwtConfig.KEY)
    private readonly jwtCondiguration: ConfigType<typeof jwtConfig>,
    private readonly jwtService: JwtService,
  ) {}
  async login(loginDto: LoginDto) {
    const passwordHash = await this.hashService.hash(loginDto.password);
    const user = this.prisma.user.findUnique({
      where: {
        email: loginDto.email,
        password: passwordHash,
      },
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

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
    const acessToken = this.jwtService.signAsync({
      email: user.email,
      id: user.id,
    });
    return {
      acessToken,
    };
  }
}
