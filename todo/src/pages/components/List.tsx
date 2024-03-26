import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function List({ addTodos }: { addTodos: String[] }) {
  const [todos, setTodos] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://127.0.0.1:5000/");
        const data = await response.json();
        setTodos(data);
      } catch (err) {
        console.log(err, "error");
      }
    }
    fetchData();
  }, [addTodos]);

  const deleteTodo = async (id: number) => {
    const response = await fetch(`http://127.0.0.1:5000/delete/${id}`);
    const data = await response.json();
    setTodos(data);
  };

  return (
    <>
      {todos.length === 0 ? (
        <></>
      ) : (
        <ul>
          {todos.map((todo, index) => (
            <li key={index}>
              {todo}{" "}
              <button onClick={() => navigate(`/edit/${index + 1}`)}>
                編集
              </button>
              <button onClick={() => deleteTodo(index + 1)}>削除</button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default List;
