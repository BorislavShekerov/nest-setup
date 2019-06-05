import { ConfigSource, LocalConfigSource, DeployedEnvironmentConfigSource } from './source'

/** A mechanism for retrieving the right {@link ConfigSource} to use based on the current runtime environment. */
export class ConfigSourceFactory {

  static getConfigSourceForEnvironment(): ConfigSource {
    if (process.env.ENV === 'DEV' || process.env.ENV === 'TEST') {
      return new LocalConfigSource()
    }

    return new DeployedEnvironmentConfigSource()
  }
}
