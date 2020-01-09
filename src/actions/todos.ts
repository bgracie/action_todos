import { Store } from "../store";
import { TodoId, Model } from "../model";
import * as Keyboard from "../browser/keyboard";
import * as Reducers from "../reducers/todos";

export function onTodoCheckboxClick(
  store: Store,
  model: Model,
  todoId: TodoId
) {
  store.replaceModel(Reducers.toggleTodoCompleted(model, todoId));
}

export function onTodoDoubleClick(store: Store, model: Model, todoId: TodoId) {
  store.replaceModel(Reducers.editTodo(model, todoId));
}

export function onTodoXClick(store: Store, model: Model, todoId: TodoId) {
  store.replaceModel(Reducers.deleteTodo(model, todoId));
}

export function onTodoBlur(store: Store, model: Model) {
  store.replaceModel(Reducers.updateTodo(model));
}

export function onEditingTodoChange(
  store: Store,
  model: Model,
  event: React.KeyboardEvent
) {
  const newValue = (event.target as HTMLInputElement).value;
  store.replaceModel(Reducers.updateEditField(model, newValue));
}

export function onEditingTodoKeyDown(
  store: Store,
  model: Model,
  event: React.KeyboardEvent
) {
  if (event.which === Keyboard.KeyCodeEnter) {
    store.replaceModel(Reducers.updateTodo(model));
  } else if (event.which === Keyboard.KeyCodeEscape) {
    store.replaceModel(Reducers.cancelTodoEdit(model));
  }
}

export function onNewTodoInputKeyDown(
  store: Store,
  model: Model,
  event: React.KeyboardEvent
) {
  if (event.keyCode === Keyboard.KeyCodeEnter) {
    event.preventDefault();

    store.replaceModel(Reducers.createTodo(model));
  }
}

export function onNewTodoInputChange(
  store: Store,
  model: Model,
  event: React.KeyboardEvent
) {
  const newValue = (event.target as HTMLInputElement).value;
  store.replaceModel(Reducers.changeTodoInput(model, newValue));
}

export function onFilterClick(
  store: Store,
  model: Model,
  newRoute: string,
  e: Event
) {
  e.preventDefault();
  store.replaceModel(Reducers.changeRoute(model, newRoute));
}

export function onClearCompletedClick(store: Store, model: Model) {
  store.replaceModel(Reducers.clearCompletedTodos(model));
}

export function onCompleteAllClick(store: Store, model: Model) {
  store.replaceModel(Reducers.completeAllTodos(model));
}
