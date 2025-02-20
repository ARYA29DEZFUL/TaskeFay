import React, { useEffect, useRef, useState } from "react";
import { Todo } from "../modal";
import { MdOutlineDownloadDone } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { LuPencilLine } from "react-icons/lu";
import "./style.css";
//import TodoList from "./TodoList";
import { Draggable } from "react-beautiful-dnd";

type Props = {
  index: number;
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const SingleTodo = ({ index, todo, todos, setTodos }: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const handelDone = (id: Number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const handelDlete = (id: Number) => {
    setTodos(
      todos.filter((todo) => {
        return todo.id !== id;
      })
    );
  };

  const handelEdit = (e: React.FormEvent, id: Number) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(false);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  
  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided) => (
        <form
          className="todos_single"
          onSubmit={(e) => {
            handelEdit(e, todo.id);
          }}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {edit ? (
            <input
              ref={inputRef}
              value={editTodo}
              onChange={(e) => {
                setEditTodo(e.target.value);
              }}
              className="todos_single_text"
            />
          ) : todo.isDone ? (
            <s className="todos_single_text">{todo.todo}</s>
          ) : (
            <span className="todos_single_text">{todo.todo}</span>
          )}

          <div>
            <span
              className="icon"
              onClick={() => {
                handelDone(todo.id);
              }}
            >
              <MdOutlineDownloadDone />
            </span>
            <span
              className="icon"
              onClick={() => {
                handelDlete(todo.id);
              }}
            >
              <RiDeleteBin6Line />
            </span>
            <span
              className="icon"
              onClick={() => {
                if (!edit && !todo.isDone) {
                  setEdit(!edit);
                }
              }}
            >
              <LuPencilLine />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;
