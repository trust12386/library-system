import { Controller, Get, Post, Body, Patch, Param, Delete, Request, ParseIntPipe } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Todo } from './entities/todo.entity';

@ApiTags('代办事项')
@ApiBearerAuth()
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) { }

  @Post()
  async create(
    @Request() request,
    @Body() createTodoDto: CreateTodoDto
  ): Promise<Todo> {
    return this.todoService.create(request.user.id, createTodoDto);
  }

  @Get()
  async findAll(@Request() request): Promise<Todo[]> {
    const { id, is_admin } = request.user;

    if (is_admin === 1) {
      return this.todoService.findAll();
    } else {
      return this.todoService.findAllByUserId(id);
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Todo> {
    return this.todoService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTodoDto: UpdateTodoDto
  ) {
    await this.todoService.update(id, updateTodoDto)
    return updateTodoDto
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.todoService.remove(id);
    return { id }
  }
}
