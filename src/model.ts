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

// The portion of the model for which an external object is the canonical
// source of truth
export interface Cached {
  pathname: string;
}
