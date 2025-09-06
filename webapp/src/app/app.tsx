import { useCallback, useRef} from 'react';
import { useTodos } from '@mp-hr/data-access';

export function App() {
  const { todos, addTodo, toggleTodo } = useTodos();
  const textInputRef = useRef<HTMLInputElement>(null);

  const handleAddTodo =useCallback (async () => {
    if (textInputRef.current ) {
     await addTodo(textInputRef.current.value);
      textInputRef.current.value = '';
    }
  }, [addTodo]);

  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.id}>
          <input
            type="checkbox" checked={todo.completed}
            onChange={()=> toggleTodo(todo.id)}
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
