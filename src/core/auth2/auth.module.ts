import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { BcryptService } from './hashing/bcrypt.service';
import { HashingServiceProtocol } from './hashing/hashing.service';
import jwtConfig from './jwt/jwt.config';

@Global()
@Module({
  imports: [
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: HashingServiceProtocol,
      useClass: BcryptService,
    },
    AuthService,
  ],
  exports: [HashingServiceProtocol],
})
export class AuthModule2 {}
