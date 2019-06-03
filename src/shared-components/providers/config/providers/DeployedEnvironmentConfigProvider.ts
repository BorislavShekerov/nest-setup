import * as Joi from '@hapi/joi'

import { ConfigProvider } from './ConfigProvider'
import { DbConfig } from '../ConfigProvider.model'
import { LogLevel } from '../../../models'

export class DeployedEnvironmentConfigProvider implements ConfigProvider {
  public getDbConfig(): DbConfig {
    return this.validateConfig<DbConfig>(
      Joi.object({
        host: Joi.string(),
        port: Joi.number(),
        username: Joi.string(),
        password: Joi.string(),
        database: Joi.string(),
      }),
      {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT!, 10),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
      }
    )
  }

  public getUserInterfaceDomain(): string {
    return this.validateConfig<{ domain: string }>(
      Joi.object({
        domain: Joi.string()
      }),
      {
        domain: process.env.LOG_LEVEL
      }
    ).domain
  }

  public getLogLevel(): LogLevel {
    return this.validateConfig<{ logLevel: LogLevel }>(
      Joi.object({
        logLevel: Joi.string()
      }),
      {
        logLevel: process.env.LOG_LEVEL
      }
    ).logLevel
  }

  private validateConfig<T>(schema: Joi.ObjectSchema, config: Record<string, string | number | undefined>): T {
    const { error, value: validatedEnvConfig } = Joi.validate(
      config,
      schema,
    )

    if (error) {
      throw new Error(`Config validation error: ${error.message}`)
    }

    return validatedEnvConfig
  }
}
