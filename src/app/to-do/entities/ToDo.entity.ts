import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { ApiModelProperty } from '@nestjs/swagger'

export const TO_DO_TABLE = 'to_do'

@Entity(TO_DO_TABLE)
export class ToDo {

  @PrimaryGeneratedColumn()
  @ApiModelProperty()
  id: number

  @Column({ length: 200 })
  @ApiModelProperty()
  name: string

}
