import { ChangeEvent, useState } from "react";
import { useEffect } from "react";
import { FC } from "react";
import http from "../../http";
import { TodoItem } from "../../types/Todo";

interface Props {
  onSubmit: (todo: Partial<TodoItem>) => Promise<void>;
  todo?: TodoItem;
}

const defaultTodo: Omit<TodoItem, "id"> = {
  title: "",
  description: "",
  media: "",
  status: 0,
};

const TodoForm: FC<Props> = (props) => {
  const { todo, onSubmit } = props;

  const [newTodo, setNewTodo] =
    useState<Omit<TodoItem, "id" | "status">>(defaultTodo);

  useEffect(() => {
    setNewTodo(todo || defaultTodo);
  }, [todo]);

  const onUploadChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const formData = new FormData();
    formData.set("file", e.target.files[0]);
    const response = await http.post("/upload/file", formData);
    console.log(response)

    setNewTodo({ ...newTodo, media: response.data.file });
  };

  return (
    <div>
      <div>
        <input
          value={newTodo.title}
          onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
          placeholder="输入标题"
          type="text"
        />
      </div>
      <div>
        <textarea
          placeholder="输入内容"
          value={newTodo.description}
          onChange={(e) =>
            setNewTodo({ ...newTodo, description: e.target.value })
          }
          cols={30}
          rows={10}
        ></textarea>
      </div>
      <div>
        <input accept="image/*" onChange={onUploadChange} type="file" />
      </div>
      {
        newTodo.media && (
          <div>
            <img src={newTodo.media} width="200" alt="预览" />
          </div>
        )
      }
      <button onClick={() => onSubmit(newTodo)}>提交</button>
      <button onClick={() => onSubmit(newTodo)}>重置</button>
    </div>
  );
};

export default TodoForm
