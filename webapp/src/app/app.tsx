import { useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import { Todo } from '@mp-hr/shared-types';
export function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const getTodos = useCallback(async () => {
    const resp = await axios.get<Todo[]>('http://localhost:3000/api');
    setTodos(resp.data);
  }, []);

  useEffect(() => {
    getTodos()
  }, []);

  return (
    <div>
      {JSON.stringify(todos)}
    </div>
  );
}

export default App;
