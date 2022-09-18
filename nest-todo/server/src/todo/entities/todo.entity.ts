import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


export enum TodoStatus {
  TODO = 0, //待完成
  DONE = 1, //未完成
}

@Entity()
export class Todo {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number; //自增id

  @ApiProperty()
  @Column({ length: 500 })
  title: string

  @ApiProperty()
  @Column('text')
  description?: string

  @ApiProperty()
  @Column('int', { default: TodoStatus.TODO })
  status: TodoStatus

  @ApiProperty({ required: false })
  @Column('text')
  media?: string

  @ManyToOne(() => User, (user) => user.todos)
  author: User
}
