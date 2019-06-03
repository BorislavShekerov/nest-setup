import { ApiModelProperty } from '@nestjs/swagger'

export class ToDoRequest {
  @ApiModelProperty()
  name: string
}
