import { SyntheticEvent, useState } from "react";
import List from "./components/List";

function Top() {
  const [newTodo, setNewTodo] = useState("");
  const [addTodos, setAddTodos] = useState([]);

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    fetch("http://127.0.0.1:5000/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `todo=${encodeURIComponent(newTodo)}`,
    })
      .then((response) => response.json())
      .then((data) => {
        setAddTodos(data);
        setNewTodo("");
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div>
      <h1>ToDoリスト</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="newTodo"
          name="newTodo"
          onChange={handleChangeText}
          value={newTodo}
        />
        <button type="submit">送信</button>
      </form>
      <List addTodos={addTodos}/>
    </div>
  );
}

export default Top;
