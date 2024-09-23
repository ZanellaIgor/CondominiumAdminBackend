import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class CryptoService {
  async decryptData(encryptedPayload: {
    data: string;
    iv: string;
    key: string;
  }) {
    const { data, iv, key } = encryptedPayload;

    const decipher = crypto.createDecipheriv(
      'aes-256-gcm',
      Buffer.from(key, 'base64'),
      Buffer.from(iv, 'base64'),
    );

    const decrypted = Buffer.concat([
      decipher.update(Buffer.from(data, 'base64')),
      decipher.final(),
    ]);

    return decrypted.toString();
  }

  async encryptData(data: string) {
    const secretKey = crypto.randomBytes(32);
    const iv = crypto.randomBytes(12);

    const cipher = crypto.createCipheriv('aes-256-gcm', secretKey, iv);
    let encrypted = cipher.update(data, 'utf8', 'base64');
    encrypted += cipher.final('base64');

    return {
      data: encrypted,
      iv: iv.toString('base64'),
      key: secretKey.toString('base64'),
    };
  }
}
