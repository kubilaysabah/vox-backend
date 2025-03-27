import {NestFactory} from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import {PrismaClient} from '@prisma/client'

import {AppModule} from './app.module';

const prisma = new PrismaClient()

async function connectDatabase() {
  try {
      console.log('Connected database...');
      await prisma.$disconnect()
  } catch (error) {
      console.error('Error connecting to database: ', error)
      await prisma.$disconnect()
      process.exit(1)
  }
}

(async () => {
    const app = await NestFactory.create(AppModule);
    const config = new DocumentBuilder()
        .setTitle('Cats example')
        .setDescription('The cats API description')
        .setVersion('1.0')
        .addTag('cats')
        .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, documentFactory);
    await connectDatabase();
    await app.listen(process.env.PORT ?? 5000);
})();
