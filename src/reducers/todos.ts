import { TodoId, Model } from "../model";
import { safeMerge } from "../util/object";
import { findTodoIndex, findTodo, newTodo } from "../selectors/todos";
import { Todo } from "../model";

export const toggleTodoCompleted = (model: Model, todoId: TodoId) => {
  const todos = model.todos.slice(0);
  const index = findTodoIndex(model, todoId);
  const todo = todos[index];

  todos[index] = safeMerge(todo, { completed: !todo.completed });

  return safeMerge(model, { todos: todos });
};

export const editTodo = (model: Model, todoId: TodoId) => {
  const todo = findTodo(model, todoId);

  return safeMerge(model, {
    editingTodoId: todoId,
    editingTodoLabel: todo.label
  });
};

export const deleteTodo = (model: Model, todoId: TodoId) => {
  const newTodos = model.todos.filter(todo => todo.id !== todoId);

  return safeMerge(model, { todos: newTodos });
};

export const updateEditField = (model: Model, newValue: string) => {
  return safeMerge(model, { editingTodoLabel: newValue });
};

export const cancelTodoEdit = (model: Model) =>
  safeMerge(model, { editingTodoLabel: "", editingTodoId: null });

export const createTodo = (model: Model) => {
  if (model.newTodoLabel.length === 0) {
    return model;
  } else {
    return safeMerge(model, {
      todos: model.todos.concat(newTodo(model.newTodoLabel)),
      newTodoLabel: ""
    });
  }
};

export const changeTodoInput = (model: Model, newValue: string) => {
  return safeMerge(model, { newTodoLabel: newValue });
};

export const changeRoute = (model: Model, newRoute: string) => {
  return safeMerge(model, { pathname: newRoute });
};

export const clearCompletedTodos = (model: Model) => {
  const newTodos = model.todos.filter(todo => !todo.completed);

  return safeMerge(model, { todos: newTodos });
};

export const completeAllTodos = (model: Model) => {
  const newTodos = model.todos.map((todo: Todo) =>
    safeMerge(todo, { completed: true })
  );

  return safeMerge(model, { todos: newTodos });
};

export const updateTodo = (model: Model) => {
  const newTodos = model.todos.slice(0);
  const editingTodoIndex = findTodoIndex(model, model.editingTodoId as TodoId);
  const editingTodo = model.todos[editingTodoIndex];
  const updatedTodo = safeMerge(editingTodo, { label: model.editingTodoLabel });
  newTodos[editingTodoIndex] = updatedTodo;

  return safeMerge(model, { todos: newTodos });
};
