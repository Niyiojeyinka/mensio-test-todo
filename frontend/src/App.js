import "./App.css";
import { useState, useEffect } from "react";
import request from "./helpers/request";
import removeFromTodo from "./helpers/todo";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      todos[0]["id"] = result;
      toast.success("Todo Added Successfuly");
      setTodos(todos);
    } else {
      setTodo(todos[0]["title"]);
      toast.error("Error Occurred,please retry");
      const updatedTodos = removeFromTodo(0, todos);
      setTodos(updatedTodos);
    }
  };

  const handleDelete = async (index) => {
    const keepTodo = todos[index];
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
        //return response.body.data.id;
        toast.success("Deleted Successfuly");
      } else {
        throw new Error("");
      }
    } catch (e) {
      updatedTodos.unshift(keepTodo);
      setTodos([...updatedTodos]);
      toast.error("Couldn't Complete,pls try again");
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
        toast.success("Task Completed Successfully");
      } else {
        throw new Error("");
      }
    } catch (e) {
      toast.error("Couldn't Complete,pls try again");

      todos[index]["status"] = "pending";
      setTodos([...todos]);
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
      <ToastContainer autoClose={2000} />
    </div>
  );
}

export default App;
