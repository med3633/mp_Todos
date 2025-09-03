import { useCallback, useEffect, useState, useRef} from 'react';
import axios from 'axios';
import { Todo } from '../../../dist/shared-types/src';
import { get } from 'node_modules/axios/index.cjs';
export function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const textInputRef = useRef<HTMLInputElement>(null);
  const getTodos = useCallback(async () => {
    const resp = await axios.get<{ todos: Todo[] }>('http://localhost:3000/api');
    setTodos(resp.data.todos);
  }, []);
  const handleAddTodo = useCallback(async () => {
    if (textInputRef.current) {
      await axios.post('http://localhost:3000/api', {
        title: textInputRef.current.value
      });
      textInputRef.current.value = '';
      getTodos();
    }
  }, [getTodos]);

  const onToggle = useCallback(async (id: number) => {
    const currentTodo = todos.find((todo) => todo.id === id);
    if (currentTodo) {
      await axios.post(`http://localhost:3000/api/set-completed`, {
        id: id,
        completed: !currentTodo.completed
      });
      getTodos();
    }
  }, [todos, getTodos]);

  useEffect(() => {
    getTodos()
  }, [getTodos]);

  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.id}>
          <input
            type="checkbox" checked={todo.completed}
            onChange={()=> onToggle(todo.id)}
          />
          {todo.title}
        </div>
      ))}
      <div>
        <input ref={textInputRef} />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>
    </div>
  );
}

export default App;
