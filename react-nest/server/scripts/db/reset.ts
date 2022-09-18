import { Todo } from 'src/todo/entities/todo.entity';
import { User } from 'src/user/entities/user.entity';
import { DataSource } from 'typeorm';
import ormConfig from './config';

export const dateSource = new DataSource(ormConfig);

const reset = async () => {
  const connection = await dateSource.initialize();

  await connection.createQueryBuilder().delete().from(Todo).execute();
  await connection.createQueryBuilder().delete().from(User).execute();
};

reset()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
