import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo, TodoStatus } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }

  async create(userId: number, createTodoDto: CreateTodoDto): Promise<Todo> {
    const user = await this.userRepository.findOneBy({ id: userId });
    const { title, description, media } = createTodoDto

    const todo = new Todo();
    todo.title = title;
    todo.description = description;
    todo.status = createTodoDto.status || TodoStatus.TODO;
    todo.media = media;
    todo.author = user;

    return this.todoRepository.save(todo);
  }

  async findAll(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  async findAllByUserId(userId: number): Promise<Todo[]> {
    const user = await this.userRepository.findOne({
      relations: ['todos'],
      where: { id: userId }
    })

    return user ? user.todos : []
  }

  async findOne(id: number): Promise<Todo> {
    return this.todoRepository.findOneBy({ id: id })
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    const { title, description, status, media } = updateTodoDto;

    return this.todoRepository.update(id, {
      title,
      description,
      status: status || TodoStatus.TODO,
      media: media || ''
    })
  }

  async remove(id: number) {
    return this.todoRepository.delete({ id })
  }
}
