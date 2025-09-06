import { useRef} from 'react';
import { useTodos } from '@mp-hr/data-access';

export function App() {
  const { todos, addTodo, toggleTodo } = useTodos();
  const textInputRef = useRef<HTMLInputElement>(null);

  const handleAddTodo = () => {
    if (textInputRef.current && textInputRef.current.value.trim()) {
      addTodo(textInputRef.current.value);
      textInputRef.current.value = '';
    }
  };

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
