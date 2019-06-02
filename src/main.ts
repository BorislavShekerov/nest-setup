import { NestFactory } from '@nestjs/core'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import * as helmet from 'helmet'
import * as csurf from 'csurf'

import { CorsConfiguratior, CustomLogger } from './config'
import { AppModule } from './app/app.module'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      logger: new CustomLogger(),
    }
  )
  CorsConfiguratior.configureCORS(app)
  app.use(helmet())
  app.use(csurf())

  const options = new DocumentBuilder()
    .setTitle('ToDo example')
    .setDescription('The ToDo API description')
    .setVersion('1.0')
    .addTag('to-do')
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api', app, document)

  await app.listen(3000)
}
bootstrap()
