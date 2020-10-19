import { filter, round, some } from "lodash";
import { action, computed, makeObservable, observable } from "mobx";

export type TTodo = {
  id: number;
  title: string;
  isComplete: boolean;
};

type TAddableTodo = Omit<TTodo, "id">;

export class TodoStore {
  public todos: TTodo[] = [];
  private todoId: number = 1;

  constructor() {
    makeObservable(this, {
      todos: observable,
      addTodo: action,
      checkTodo: action,
      removeTodos: action,
      isNotEmptyTodos: computed,
      completedTodos: computed,
      completedPercent: computed,
    });

    this.addTodo = this.addTodo.bind(this);
    this.removeTodos = this.removeTodos.bind(this);
    this.checkTodo = this.checkTodo.bind(this);
  }

  public get isNotEmptyTodos() {
    return this.todos.length !== 0;
  }

  public get completedTodos() {
    return filter(this.todos, (todo) => todo.isComplete);
  }

  public get completedPercent() {
    return round((this.completedTodos.length / this.todos.length) * 100);
  }

  public addTodo(todo: TAddableTodo) {
    this.todoId += 1;

    this.todos.unshift({
      id: this.todoId,
      ...todo,
    });
  }

  public removeTodos(ids: TTodo["id"][]) {
    this.todos = filter(this.todos, (todo) => !some(ids, (id) => id === todo.id));
  }

  public checkTodo(id: TTodo["id"]) {
    const todo = this.todos.find((todo) => todo.id === id);

    if (todo) {
      todo.isComplete = !todo.isComplete;
    }
  }
}
