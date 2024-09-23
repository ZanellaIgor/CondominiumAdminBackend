import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { LoginDto } from '../auth/dto/login.dto';

@Injectable()
export class CryptoService {
  async encryptData(
    data: string,
  ): Promise<{ data: string; iv: string; key: string; authTag: string }> {
    const secretKey = crypto.randomBytes(32);
    const iv = crypto.randomBytes(12);

    const cipher = crypto.createCipheriv('aes-256-gcm', secretKey, iv);
    let encrypted = cipher.update(data, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    const authTag = cipher.getAuthTag().toString('base64');

    return {
      data: encrypted,
      iv: iv.toString('base64'),
      key: secretKey.toString('base64'),
      authTag: authTag,
    };
  }

  async decryptData(encryptedPayload: LoginDto): Promise<string> {
    const { data, iv, key, authTag } = encryptedPayload;

    const decipher = crypto.createDecipheriv(
      'aes-256-gcm',
      Buffer.from(key, 'base64'),
      Buffer.from(iv, 'base64'),
    );

    decipher.setAuthTag(Buffer.from(authTag, 'base64'));

    let decrypted = decipher.update(data, 'base64', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  }
}
