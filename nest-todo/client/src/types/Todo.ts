export enum TodoStatus {
  TODO = 0,
  DONE = 1,
}

export interface TodoItem {
  id: number;
  title: string;
  description?: string;
  media?: string;
  status: TodoStatus;
}
