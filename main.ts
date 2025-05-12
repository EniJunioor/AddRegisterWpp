import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilita CORS (se for consumir essa API de outro domínio, como um frontend React, etc)
  app.enableCors();

  // Valida automaticamente DTOs, faz transformação de tipos (ex: string → number)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove propriedades não esperadas nos DTOs
      forbidNonWhitelisted: true, // Lança erro se vier algo fora do DTO
      transform: true, // Converte os tipos (ex: string para number com @Type)
    }),
  );

  await app.listen(3000, '0.0.0.0');
  console.log(`🚀  API rodando em http://localhost:3000`);
}
bootstrap();
