export type TodoId = string;
export type TodoIndex = number;
export type TodoLabel = string;
export interface Todo {
  id: TodoId;
  label: TodoLabel;
  completed: boolean;
}

export interface Model {
  cached: Cached;
  editingTodoId: TodoId | null;
  newTodoLabel: TodoLabel;
  editingTodoLabel: TodoLabel;
  todos: Todo[];
}

export interface Cached {
  pathname: string;
}
