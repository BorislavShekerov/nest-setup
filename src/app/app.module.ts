import { Module } from '@nestjs/common'

import { HelloWorldModule } from './hello-world'

@Module({
  imports: [HelloWorldModule],
})
export class AppModule {
}
