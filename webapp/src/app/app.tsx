import { useCallback, useEffect, useState, useRef} from 'react';
import axios from 'axios';
import { Todo } from '../../../shared-types/src';
import { get } from 'node_modules/axios/index.cjs';
export function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const textInputRef = useRef<HTMLInputElement>(null);
  const getTodos = useCallback(async () => {
    const resp = await axios.get<Todo[]>('http://localhost:3000/api');
    setTodos(resp.data);
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

  useEffect(() => {
    getTodos()
  }, [getTodos]);

  return (
    <div>
      {JSON.stringify(todos)}
      <div>
        <input ref={textInputRef} />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>
    </div>
  );
}

export default App;
