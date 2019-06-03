import { NestFastifyApplication } from '@nestjs/platform-fastify'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { Logger } from '@nestjs/common'

import { Configurator } from './Configurator'

export class SwaggerConfigurator implements Configurator {
  private logger = new Logger('SwaggerConfigurator')

  configure(app: NestFastifyApplication) {
    const options = new DocumentBuilder()
      .setTitle('ToDo example')
      .setDescription('The ToDo API description')
      .setVersion('1.0')
      .addTag('to-do')
      .build()

    const document = SwaggerModule.createDocument(app, options)
    SwaggerModule.setup('docs', app, document)
    this.logger.log('Swagger setup on URL /docs')
  }
}
