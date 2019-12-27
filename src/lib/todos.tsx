import { Model, TodoId, Todo, TodoLabel, TodoIndex } from "./model";
import { uuid } from "../utilities";
import * as Paths from "./paths";

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
    if (model.cached.pathname === Paths.PathAll) {
      return true;
    } else if (model.cached.pathname === Paths.PathActive) {
      return !_todo.completed;
    } else if (model.cached.pathname === Paths.PathCompleted) {
      return _todo.completed;
    } else {
      throw new Error("Filter options should be exhaustive.");
    }
  });
};

export const newTodo = (label: TodoLabel) => {
  return {
    id: uuid(),
    label: label,
    completed: false
  };
};
