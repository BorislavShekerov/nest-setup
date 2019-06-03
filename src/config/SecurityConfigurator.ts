import {
  NestFastifyApplication
} from '@nestjs/platform-fastify'
import { Logger } from '@nestjs/common'
import * as helmet from 'helmet'

import { Environment } from '../shared-components/models'
import { ConfigProviderFactory } from '../shared-components/providers'
import { Configurator } from './Configurator'

const ENVIRONMENTS_WITH_LOCALHOST_ORIGIN_ENABLED: string[] = [
  Environment[Environment.development],
  Environment[Environment.integration],
  Environment[Environment.uat]
]

export class SecurityConfigurator implements Configurator {
  private logger = new Logger('SecurityConfigurator')

  /**
   * Configures CORS based on the current environment.
   * For dev, integration and uat environments http://localhost:1234 is also an allowed origin.
   *
   * @param app the express app object
   */
  public configure(app: NestFastifyApplication) {
    this.setupCors(app)
    app.use(helmet())
  }

  private setupCors(app: NestFastifyApplication) {
    const uiDomain = ConfigProviderFactory.getConfigProviderForEnvironment().getUserInterfaceDomain()
    this.logger.log(`Enabling CORS for ${uiDomain}`)

    app.enableCors({
      origin: ENVIRONMENTS_WITH_LOCALHOST_ORIGIN_ENABLED.indexOf(process.env.ENV!) > -1
        ? [uiDomain, 'http://localhost:1234']
        : process.env.uiDomain,
      credentials: true
    })
  }
}
