// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Pour lire les cookies
  app.use(cookieParser());

  // CORS configuré selon l'environnement
  // const frontendUrl = 'http://localhost:5173';

  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true, // ← autorise les cookies
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();