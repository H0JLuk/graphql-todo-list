import { makeAutoObservable } from "mobx";

export class TodoStore {
  todos = [];

  constructor() {
    makeAutoObservable(this);
  }

  loadTodos = (todos) => (this.todos = todos);

  addTodo = (todo) => this.todos.push(todo);

  toggleCompleteTodo = ({ id, completed }) => {
    this.todos = this.todos.map((todo) => {
      todo.id === id && (todo.completed = completed);
      return todo;
    });
  };

  deleteTodo = (id) => {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  };
}
