import React, { useState } from "react";
import "./App.css";
import InputFeild from "./components/InputFeild";
import { Todo } from "./modal";
import TodoList from "./components/TodoList";
import { DragDropContext,  DropResult } from "react-beautiful-dnd";

/*let name: string;
let age: number | string;
let isStudent: boolean;
let role: [number?, string?];
let unnon: any;
let unnon2: unknown;
type Person = {
  name?: string;
  age?: number;
};

let person: Person = { name: "ali" };
let printLiist: (name?: string) => void;

type X = {
  a: number;
  b: number;
};

type Y = X & {
  c: number;
  d: number;
};

interface V {
  a: number;
  b: number;
}
interface U extends V {
  c: number;
  d: number;
}

role = [];*/

const App: React.FC = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const handelAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      setTodos([...todos, { id: Date.now(), todo: todo, isDone: false }]);
      setTodo("");
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    let add,
      active = todos,
      complate = completedTodos;

    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complate[source.index];
      complate.splice(source.index, 1);
    }

    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add);
    } else {
      complate.splice(destination.index, 0, add);
    }

    setCompletedTodos(complate);
    setTodos(active);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Taskify</span>
        <InputFeild todo={todo} setTodo={setTodo} handelAdd={handelAdd} />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
