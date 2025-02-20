//rfce
import React from "react";
import "./style.css";
import { useRef } from "react";

interface Test {
  todo: string;
  setTodo: Function;
  handelAdd: (e: React.FormEvent) => void;
}

function InputFeild({ todo, setTodo, handelAdd }: Test) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="AppFild">
      <form
        className="input"
        onSubmit={(e) => {
          handelAdd(e);
          inputRef.current?.blur();
        }}
      >
        <input
          ref={inputRef}
          type="input"
          placeholder="Enter a task"
          className="input_box"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button className="input_submit" type="submit">
          Go
        </button>
      </form>
    </div>
  );
}

export default InputFeild;
