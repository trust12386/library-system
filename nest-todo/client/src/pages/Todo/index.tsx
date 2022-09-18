import { useState, useEffect } from "react";
import { FC } from "react";
import http from "../../http";
import { TodoItem } from "../../types/Todo";
import TodoForm from "../../Components/TodoForm";
import List from "./List";

const Todo: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [todos, setTodos] = useState<TodoItem[]>([]);

  const [formType, setFormType] = useState<"add" | "update" | null>(null);
  const [selectded, setSelected] = useState<TodoItem | undefined>();

  const fetchTodos = async () => {
    setLoading(true);
    const { data } = await http.get<TodoItem[]>("/todo");
    setTodos(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchTodos().then();
  }, []);

  const submitTodo = async (newTodo: Partial<TodoItem>) => {
    console.log(newTodo)
    setLoading(true);
    if (formType === "add") {
      await http.post<TodoItem>("/todo", newTodo);
    } else {
      await http.patch<TodoItem>(`/todo/${newTodo.id}`, newTodo);
    }
    setSelected(undefined);
    setFormType(null);
    setLoading(false);
    await fetchTodos();
  };

  const deleteTodo = async (id: number) => {
    setLoading(true);
    await http.delete<TodoItem>(`/todo/${id}`);
    setLoading(false);
    await fetchTodos();
  };

  return (
    <div className="APP">
      {loading && <div>Loading...</div>}

      <div>
        <button
          onClick={() => {
            setFormType("add");
            setSelected(undefined);
          }}
        >
          添加新待办
        </button>
      </div>

      {(formType === "add" || selectded) && (
        <div>
          <TodoForm todo={selectded} onSubmit={submitTodo} />
        </div>
      )}

      <hr />

      <List
        todoList={todos}
        onDelete={deleteTodo}
        onEdit={(todo) => {
          setFormType("update");
          setSelected(todo);
        }}
      />
    </div>
  );
};

export default Todo