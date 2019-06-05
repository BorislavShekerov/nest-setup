import { DbConfig, LogLevel } from '../../../models'
import { ConfigSource } from './ConfigSource'

export class LocalDevConfigSource implements ConfigSource {
  public getDbConfig(): DbConfig {
    return {
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '',
      database: 'db'
    }
  }

  public getUserInterfaceDomain(): string {
    return 'http://localhost:1234'
  }

  public getLogLevel(): LogLevel {
    return LogLevel.debug
  }
}
