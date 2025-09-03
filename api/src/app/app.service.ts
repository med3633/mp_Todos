import { Injectable } from '@nestjs/common';
import { Todo } from '../../../dist/shared-types/src';
//create interface
// interface Todo {
//   id: number;
//   title: string;
//   completed: boolean;
// }

@Injectable()
export class AppService {
  private todos: Todo[] = [
    { id: 1, title: 'Todo 1', completed: false },
    { id: 2, title: 'Todo 2', completed: true },
  ];

  getData(): { todos: Todo[] } {
    return { todos: this.todos };
  }

  add(title: string): void {
    this.todos.push({
      id: this.todos.length + 1,
      title,
      completed: false,
    });
  }

  setCompleted(id: number, completed: boolean): void {
    this.todos = this.todos.map((todo) => ({
      ...todo,
      completed: todo.id === id ? completed : todo.completed,
    }));
  }
}
