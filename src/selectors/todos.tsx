import { Model, TodoId, Todo, TodoLabel, TodoIndex } from "../model";
import * as Uuid from "../util/uuid";
import * as Paths from "./url_paths";

export const findTodo = (model: Model, todoId: TodoId): Todo => {
  return model.todos.find(_todo => {
    return _todo.id === todoId;
  }) as Todo;
};

export const findTodoIndex = (model: Model, todoId: TodoId): TodoIndex => {
  return model.todos.findIndex(_todo => {
    return _todo.id === todoId;
  });
};

export const activeTodoCount = (model: Model) => {
  return model.todos.filter((_todo: Todo) => !_todo.completed).length;
};

export const completedTodoCount = (model: Model) => {
  return model.todos.length - activeTodoCount(model);
};

export const shownTodos = (model: Model): Todo[] => {
  return model.todos.filter(_todo => {
    if (model.pathname === Paths.AllTodos) {
      return true;
    } else if (model.pathname === Paths.ActiveTodos) {
      return !_todo.completed;
    } else if (model.pathname === Paths.CompletedTodos) {
      return _todo.completed;
    } else {
      throw new Error("Filter options should be exhaustive.");
    }
  });
};

export const newTodo = (label: TodoLabel) => {
  return {
    id: Uuid.generate(),
    label: label,
    completed: false
  };
};
