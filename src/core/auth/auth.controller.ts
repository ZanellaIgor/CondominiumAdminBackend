import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { CryptoService } from '../crypto/crypto.service'; // Serviço de criptografia
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
    console.log(encryptedPayload, 'sss');
    const decryptedData =
      await this.cryptoService.decryptData(encryptedPayload);
    console.log(decryptedData);
    const { email, password } = JSON.parse(decryptedData);

    const user = await this.authService.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // Gera o token e retorna a resposta criptografada
    return this.authService.login(user);
  }
}
