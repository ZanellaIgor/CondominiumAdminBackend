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
      console.log('Payload recebido no login:', encryptedPayload);
      const decryptedData =
        await this.cryptoService.decryptData(encryptedPayload);
      console.log('Dados descriptografados:', decryptedData);

      const { email, password } = JSON.parse(decryptedData);
      console.log('Email:', email, 'Password:', password);

      const user = await this.authService.validateUser(email, password);

      if (!user) {
        throw new UnauthorizedException('Credenciais inválidas');
      }

      const encryptedResponse = await this.authService.login(user);
      console.log('Resposta criptografada:', encryptedResponse);

      return encryptedResponse;
    } catch (error) {
      console.error('Erro durante o login:', error);
      throw new UnauthorizedException('Erro durante o login');
    }
  }
}
