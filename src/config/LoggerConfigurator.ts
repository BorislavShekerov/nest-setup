import { Logger } from '@nestjs/common'
import { ConfigProviderFactory } from '../shared-components/providers'
import { LogLevel } from '../shared-components/models'

/** A log-level aware logger which only logs debug statements when LOG_LEVEL is set to debug. */
export class CustomLogger extends Logger {
  private logLevel: LogLevel

  constructor(configProvider = ConfigProviderFactory.getConfigProviderForEnvironment()) {
    super()
    this.logLevel = configProvider.getLogLevel()
  }

  debug(message: string) {
    if (this.logLevel === LogLevel.debug) {
      super.debug(message)
    }
  }
}
