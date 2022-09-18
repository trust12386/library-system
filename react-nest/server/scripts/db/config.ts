import { Todo } from 'src/todo/entities/todo.entity';
import { User } from 'src/user/entities/user.entity';
import { DataSourceOptions } from 'typeorm';

const ormConfig: DataSourceOptions = {
  type: 'mysql',
  database: 'nest_todo',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'trust12386',
  entities: [User, Todo],
};

export default ormConfig;
