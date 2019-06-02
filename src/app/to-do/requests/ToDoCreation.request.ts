import { ApiModelProperty } from '@nestjs/swagger'

export class ToDoCreationRequest {
  @ApiModelProperty()
  name: string
}
