import { ApiProperty } from "@nestjs/swagger";
import * as bcrypt from 'bcrypt'
import { Exclude } from "class-transformer";
import { Todo } from "src/todo/entities/todo.entity";
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @ApiProperty({ description: '自增id' })
  @PrimaryGeneratedColumn()
  id: number; //自增id

  @ApiProperty({ description: '用户名' })
  @Column({ length: 500 })
  username: string

  @ApiProperty({ description: '密码' })
  @Exclude()
  @Column({ length: 500 })
  password?: string

  @ApiProperty({ description: '邮箱' })
  @Column({ length: 500 })
  email: string

  @ApiProperty({ description: '是否为管理员' })
  @Column('int', { default: 1 })
  is_admin?: number

  @OneToMany(() => Todo, (todo) => todo.author, { cascade: true })
  todos: Todo[]

  @BeforeInsert()
  private async hashPassword() {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
  }
}
