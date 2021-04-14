import "./App.css";
import { useState, useEffect } from "react";
import request from "./helpers/request";
import removeFromTodo from "./helpers/todo";

const BACKEND_URL = "http://localhost:9000/api/todo";

const EachListView = ({ todo, handleRemove, handleClick }) => {
  return (
    <div
      className={`list-item ${todo.status === "completed" ? "completed" : ""}`}
    >
      <span onClick={handleClick}>{todo.title}</span>
      <button className="remove-btn" onClick={handleRemove}>
        {" "}
        Remove
      </button>
    </div>
  );
};
/*
const testData = [{ title: "need to read", 
status: "published", id: null
actionStatus:1
}];
*/
function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");

  useEffect(async () => {
    const response = await request(BACKEND_URL, "GET");
    if (response.status === 200) {
      setTodos(response.body.data.todo);
    }
  }, []);

  const sendTodoToBackend = async (value) => {
    try {
      /**
       * send to backend and if successful save its id to the right state
       */
      const response = await request(BACKEND_URL, "POST", "json", {
        title: value,
      });

      if (response.status === 201) {
        return response.body.data.id;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  };

  const handleEnter = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      //submit here
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    todos.unshift({
      title: todo,
    });
    setTodos(todos);
    setTodo("");
    //send to server
    let result = await sendTodoToBackend(todo);
    if (result) {
      todos[0]["actionStatus"] = 1;
      todos[0]["id"] = result;
    } else {
      todos[0]["actionStatus"] = 0;
      todos[0]["id"] = null;
      alert("Error Occured");
    }
    setTodos(todos);
  };

  const handleDelete = async (index) => {
    const updatedTodos = removeFromTodo(index, todos);
    setTodos(updatedTodos);

    try {
      /**
       * send to backend and if successful save its id to the right state
       */
      const response = await request(
        `${BACKEND_URL}/${todos[index]["id"]}`,
        "DELETE"
      );

      if (response.status === 200) {
        return response.body.data.id;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  };

  const handleCompleted = async (index) => {
    todos[index]["status"] = "completed";

    setTodos([...todos]);

    //send to server

    try {
      /**
       * send to backend and if successful save its id to the right state
       */
      const response = await request(
        `${BACKEND_URL}/${todos[index]["id"]}`,
        "PUT",
        "json",
        {
          status: "completed",
        }
      );

      if (response.status === 200) {
        void 0;
      } else {
        alert("Couldn't mark completed ,please try again");
      }
    } catch (e) {
      alert("Couldn't mark completed ,please try again");
    }
  };

  const todoDisplayJSX = todos.map((todo, index) => {
    return (
      <EachListView
        key={index}
        todo={todo}
        index={index}
        handleRemove={() => {
          handleDelete(index);
        }}
        handleClick={() => {
          handleCompleted(index);
        }}
      />
    );
  });

  return (
    <div className="App">
      <div className="heading ">To Do</div>
      <div className="input-todo">
        <input
          type="text"
          name="title"
          onChange={(e) => {
            setTodo(e.target.value);
          }}
          value={todo}
          onKeyUp={handleEnter}
          placeholder="What needs to be done"
        />

        <button className="submit" onClick={handleSubmit}>
          Add
        </button>
      </div>
      <div>{todoDisplayJSX}</div>
    </div>
  );
}

export default App;
