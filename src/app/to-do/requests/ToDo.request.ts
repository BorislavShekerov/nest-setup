import { ApiModelProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class ToDoRequest {

  @ApiModelProperty()
  @IsNotEmpty()
  name: string
}
