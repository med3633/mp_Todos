import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { Todo } from '../../../dist/shared-types/src';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const getTodos = useCallback(async () => {
    const resp = await axios.get<{ todos: Todo[] }>('http://localhost:3000/api');
    setTodos(resp.data.todos);
  }, []);

  const addTodo = useCallback(
    async (title: string) => {
      await axios.post('http://localhost:3000/api', {
        title,
      });
      getTodos();
    },
    [getTodos]
  );

  const toggleTodo = useCallback(
    async (id: number) => {
      const currentTodo = todos.find((todo) => todo.id === id);
      if (currentTodo) {
        await axios.post(`http://localhost:3000/api/set-completed`, {
          id,
          completed: !currentTodo.completed,
        });
        getTodos();
      }
    },
    [todos, getTodos]
  );

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  return {
    todos,
    addTodo,
    toggleTodo,
  };
}
