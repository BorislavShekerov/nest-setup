import { ConfigProvider, LocalConfigProvider, DeployedEnvironmentConfigProvider } from './providers'

/** A mechanism for retrieving the right {@link ConfigProvider} to use based on the current runtime environment. */
export class ConfigProviderFactory {

  static getConfigProviderForEnvironment(): ConfigProvider {
    if (process.env.ENV === 'DEV') {
      return new LocalConfigProvider()
    }

    return new DeployedEnvironmentConfigProvider()
  }
}
