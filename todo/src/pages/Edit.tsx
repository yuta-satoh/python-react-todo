import { SyntheticEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Edit() {
  const [todo, setTodo] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };

  useEffect(() => {
    async function fetchTodo() {
      try {
        const response = await fetch(`http://127.0.0.1:5000/edit/${id}`);
        if (!response.ok) {
          throw new Error("Todoの取得に失敗しました");
        }
        const data = await response.json();
        setTodo(data);
      } catch (err) {
        console.log(err, "error");
      }
    }
    fetchTodo();
  }, [id]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    fetch(`http://127.0.0.1:5000/update/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `todo=${encodeURIComponent(todo)}`,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        navigate("/"); 
      })
      .catch((error) => console.error("Error:", error));
  };
  return (
    <div>
      <h1>ToDoリスト</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="todo"
          name="todo"
          onChange={handleChangeText}
          value={todo}
        />
        <button type="submit">送信</button>
      </form>
    </div>
  );
}
export default Edit;
