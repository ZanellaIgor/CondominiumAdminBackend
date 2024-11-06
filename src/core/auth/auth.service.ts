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
    const user = await this.prisma.user.findUnique({
      where: {
        email: loginDto.email,
      },
      select: {
        password: true,
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

    const isValidPassword = await this.hashService.compare(
      loginDto.password,
      user.password,
    );

    if (!isValidPassword) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const acess_token = await this.jwtService.signAsync(
      {
        userId: user.id,
        role: user.role,
        condominiumIds: user.condominiums?.map((condominium) => condominium.id),
        apartmentIds: user.apartments?.map((apartment) => apartment.id),
      },
      {
        audience: this.jwtCondiguration.audience,
        issuer: this.jwtCondiguration.issuer,
        secret: this.jwtCondiguration.secret,
        expiresIn: this.jwtCondiguration.jwtTtl,
      },
    );

    return { acess_token };
  }
}
