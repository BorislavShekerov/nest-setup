import { Module } from '@nestjs/common'

import { HelloWorldController } from './hello-world.controller'
import { HelloWorldService } from './hello-world.service'
import { TestPipelineService } from './test-pipeline.service'

@Module({
  imports: [],
  controllers: [HelloWorldController],
  providers: [HelloWorldService, TestPipelineService],
})
export class HelloWorldModule { }
