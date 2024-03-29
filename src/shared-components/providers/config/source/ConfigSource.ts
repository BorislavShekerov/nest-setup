import { DbConfig, LogLevel } from '../../../models'

/** A mechanism for providing environment-specific configuration properties. */
export interface ConfigSource {

  /** Retrieves the {@link DbConfig} based on the current environment. */
  getDbConfig(): DbConfig

  /** Retrieves the URL where the user interface is running. */
  getUserInterfaceDomain(): string

  /** Retrieves the log level defined on startup. */
  getLogLevel(): LogLevel
}
