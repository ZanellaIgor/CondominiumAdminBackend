import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { CryptoService } from '../crypto/crypto.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private cryptoService: CryptoService,
  ) {}

  @Post('login')
  async login(@Body() encryptedPayload: LoginDto) {
    try {
      const decryptedData =
        await this.cryptoService.decryptData(encryptedPayload);

      const { email, password } = JSON.parse(decryptedData);

      const user = await this.authService.validateUser(email, password);

      if (!user) {
        throw new UnauthorizedException('Credenciais inválidas');
      }

      const encryptedResponse = await this.authService.login(user);

      return encryptedResponse;
    } catch (error) {
      throw new UnauthorizedException('Erro durante o login');
    }
  }
}
