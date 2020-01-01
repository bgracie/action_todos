export type TodoId = string;
export type TodoIndex = number;
export type TodoLabel = string;
export type Pathname = string;
export interface Todo {
  id: TodoId;
  label: TodoLabel;
  completed: boolean;
}

export interface Model {
  pathname: Pathname;
  editingTodoId: TodoId | null;
  newTodoLabel: TodoLabel;
  editingTodoLabel: TodoLabel;
  todos: Todo[];
}
