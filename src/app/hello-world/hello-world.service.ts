import { Injectable, Logger } from '@nestjs/common'
import { TestPipelineService } from './test-pipeline.service';

@Injectable()
export class HelloWorldService {
  private logger = new Logger(HelloWorldService.name)

  constructor(private testPipelineService: TestPipelineService) {
  }

  getHello(): string {
    this.logger.log('Executing hello world service')
    setImmediate(() => this.testPipelineService.executePipeline())
    this.logger.log('Returning from service')
    return 'Hello World!'
  }
}
