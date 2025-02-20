import React from "react";
import "./style.css";
import { Todo } from "../modal";
import SingleTodo from "./SingleTodo";
import { Droppable } from "react-beautiful-dnd";

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({
  todos,
  setTodos,
  completedTodos,
  setCompletedTodos,
}) => {

  return (
    <div className="container">
      <Droppable droppableId="TodosList">
        {(provided,snapshot) => (
          <div
            className={`todos ${snapshot.isDraggingOver?"dragactive":""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos_heading"> Active Tasks</span>
            {todos.map((todo, index) => (
              <SingleTodo
                index={index}
                todo={todo}
                key={todo.id}
                todos={todos}
                setTodos={setTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <Droppable droppableId="12">
        {(provided,snapshot) => (
          <div
            className={`todos remove ${snapshot.isDraggingOver?"dragcomplete":""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos_heading"> Completed Tasks</span>
            {completedTodos.map((todo, index) => (
              <SingleTodo
                index={index}
                todo={todo}
                key={todo.id}
                todos={completedTodos}
                setTodos={setCompletedTodos}
              />
            ))}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;
