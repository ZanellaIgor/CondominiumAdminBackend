import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { CryptoService } from '../crypto/crypto.service';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller'; // Importe o AuthController
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
    UserModule,
  ],
  providers: [AuthService, JwtStrategy, CryptoService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
