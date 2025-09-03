import { useEffect, useState} from 'react';
import axios from 'axios';
import { Todo } from '@mp-hr/shared-types';
export function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('http://localhost:3000/api');
      setTodos(result.data.todos);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.title}
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggle(todo.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
