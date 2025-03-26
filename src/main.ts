import {NestFactory} from '@nestjs/core';
import {PrismaClient} from '@prisma/client'

import {AppModule} from './app.module';

const prisma = new PrismaClient()

async function connectDatabase() {
  try {
      await prisma.$disconnect()
  } catch (error) {
      console.error(error)
      await prisma.$disconnect()
      process.exit(1)
  }
}

(async () => {
    const app = await NestFactory.create(AppModule);
    await connectDatabase();
    await app.listen(process.env.PORT ?? 3000);
})();
