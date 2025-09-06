import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const getTodos = useCallback(async () => {
    try {
      const resp = await axios.get<{ todos: Todo[] }>('http://10.0.2.2:3000/api');
      setTodos(resp.data.todos);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  }, []);

  const addTodo = useCallback(
    async (title: string) => {
      try {
        await axios.post('http://10.0.2.2:3000/api', {
          title,
        });
        getTodos();
      } catch (error) {
        console.error('Error adding todo:', error);
      }
    },
    [getTodos]
  );

  const toggleTodo = useCallback(
    async (id: number) => {
      try {
        const currentTodo = todos.find((todo) => todo.id === id);
        if (currentTodo) {
          await axios.post(`http://10.0.2.2:3000/api/set-completed`, {
            id,
            completed: !currentTodo.completed,
          });
          getTodos();
        }
      } catch (error) {
        console.error('Error toggling todo:', error);
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
