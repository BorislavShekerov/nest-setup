import { LogLevel } from '../../../models'
import { DbConfig } from '../ConfigProvider.model'
import { ConfigProvider } from './ConfigProvider'

export class LocalConfigProvider implements ConfigProvider {
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
