import {
  NestFastifyApplication
} from '@nestjs/platform-fastify'
import { Logger } from '@nestjs/common'
import { Environment } from '../shared-components/models'
import { ConfigProviderFactory } from '../shared-components/providers'

const ENVIRONMENTS_WITH_LOCALHOST_ORIGIN_ENABLED: string[] = [
  Environment[Environment.development],
  Environment[Environment.integration],
  Environment[Environment.uat]
]

const logger = new Logger('config')

export class CorsConfiguratior {

  /**
   * Configures CORS based on the current environment.
   * For integration and uat environments http://localhost:1234 is also an allowed origin.
   *
   * @param app the express app object
   */
  public static configureCORS(app: NestFastifyApplication) {
    const uiDomain = ConfigProviderFactory.getConfigProviderForEnvironment().getUserInterfaceDomain()
    logger.debug(`Enabling CORS for ${uiDomain}`)

    app.enableCors({
      origin: ENVIRONMENTS_WITH_LOCALHOST_ORIGIN_ENABLED.indexOf(process.env.ENV!) > -1
        ? [uiDomain, 'http://localhost:1234']
        : process.env.uiDomain,
      credentials: true
    })
  }
}
