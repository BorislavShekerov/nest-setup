import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class TestPipelineService {
  private logger = new Logger(TestPipelineService.name)

  async executePipeline(): Promise<string> {
    this.logger.log('Executing pipeline')
    return Promise.resolve('Hello World!')
  }
}
