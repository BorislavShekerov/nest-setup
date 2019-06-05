import { ConfigSource, LocalDevConfigSource, DeployedEnvironmentConfigSource } from './source'
import { LocalTestConfigSource } from './source/LocalTestConfigSource';

/** A mechanism for retrieving the right {@link ConfigSource} to use based on the current runtime environment. */
export class ConfigSourceFactory {

  static getConfigSourceForEnvironment(): ConfigSource {
    if (process.env.ENV === 'DEV') {
      return new LocalDevConfigSource()
    } else if (process.env.ENV === 'TEST') {
      return new LocalTestConfigSource()
    }

    return new DeployedEnvironmentConfigSource()
  }
}
