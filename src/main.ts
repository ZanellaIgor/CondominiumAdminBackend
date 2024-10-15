import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import 'dotenv/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Transforma os dados para o tipo correto
      whitelist: true, // Remove todas as propriedades que não existem na classe
      forbidNonWhitelisted: true, // Retorna um erro se houver propriedades que não existem na classe
    }),
  );
  // Configurando o CORS
  app.enableCors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(process.env.PORT);
}
bootstrap();
