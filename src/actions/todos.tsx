import { Store } from "../store";
import { TodoId } from "../model";
import { safeMerge } from "../utilities";
import { findTodoIndex } from "../lib/todos";

export const submitTodo = (store: Store) => {
  const _model = store.model();
  const todos = _model.todos.slice(0);
  const editingIndex = findTodoIndex(_model, _model.editingTodoId as TodoId);
  todos[editingIndex] = safeMerge(todos[editingIndex], {
    label: _model.editingTodoLabel
  });

  store.replaceModel(
    safeMerge(_model, {
      todos: todos,
      editingTodoId: null,
      editingTodoLabel: ""
    })
  );
};
