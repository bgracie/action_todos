import { Store } from "../framework/store";
import { TodoId, Model } from "../model/model";
import { safeMerge } from "../util/object";
import { findTodoIndex, findTodo, newTodo } from "../model/todos";
import * as Keyboard from "../interface/keyboard";
import { Todo } from "../model/model";

export function onTodoCheckboxClick(
  store: Store,
  model: Model,
  todoId: TodoId
) {
  const _todos = model.todos.slice(0);
  const _index = findTodoIndex(model, todoId);

  _todos[_index] = safeMerge(_todos[_index], { completed: true });

  store.replaceModel(safeMerge(model, { todos: _todos }));
}

export function onTodoDoubleClick(store: Store, model: Model, todoId: TodoId) {
  const todo = findTodo(model, todoId);

  store.replaceModel(
    safeMerge(model, { editingTodoId: todoId, editingTodoLabel: todo.label })
  );
}

export function onTodoXClick(store: Store, model: Model, todoId: TodoId) {
  const todos = model.todos.filter(_todo => {
    return _todo.id !== todoId;
  });

  store.replaceModel(safeMerge(model, { todos: todos }));
}

export function onTodoBlur(store: Store, model: Model) {
  submitTodo(store, model);
}

export function onTodoChange(
  store: Store,
  model: Model,
  event: React.KeyboardEvent
) {
  store.replaceModel(
    safeMerge(model, {
      editingTodoLabel: (event.target as HTMLInputElement).value
    })
  );
}

export function onTodoKeyDown(
  store: Store,
  model: Model,
  event: React.KeyboardEvent
) {
  if (event.which === Keyboard.KeyCodeEnter) {
    submitTodo(store, model);
  } else if (event.which === Keyboard.KeyCodeEscape) {
    store.replaceModel(
      safeMerge(model, { editingTodoLabel: "", editingTodoId: null })
    );
  }
}

export function onTodoInputKeyDown(
  store: Store,
  model: Model,
  event: React.KeyboardEvent
) {
  if (event.keyCode !== Keyboard.KeyCodeEnter) {
    return;
  }

  event.preventDefault();

  const val = (event.target as HTMLInputElement).value;

  if (val) {
    store.replaceModel(
      safeMerge(model, {
        todos: model.todos.concat(newTodo(val)),
        newTodoLabel: ""
      })
    );
  }
}

export function onTodoInputChange(
  store: Store,
  model: Model,
  event: React.KeyboardEvent
) {
  store.replaceModel(
    safeMerge(model, {
      newTodoLabel: (event.target as HTMLInputElement).value
    })
  );
}

export function onFilterClick(
  store: Store,
  model: Model,
  newRoute: string,
  e: Event
) {
  e.preventDefault();
  store.replaceModel(safeMerge(store.model(), { pathname: newRoute }));
}

export function onClearCompletedClick(store: Store, model: Model) {
  const _todos = model.todos.filter(_todo => {
    return !_todo.completed;
  });

  store.replaceModel(safeMerge(model, { todos: _todos }));
}

export function onCompleteAllClick(store: Store, model: Model) {
  store.replaceModel(
    safeMerge(model, {
      todos: model.todos.map((_todo: Todo) =>
        safeMerge(_todo, { completed: true })
      )
    })
  );
}

function submitTodo(store: Store, model: Model) {
  const todos = model.todos.slice(0);
  const editingIndex = findTodoIndex(model, model.editingTodoId as TodoId);
  todos[editingIndex] = safeMerge(todos[editingIndex], {
    label: model.editingTodoLabel
  });

  store.replaceModel(
    safeMerge(model, {
      todos: todos,
      editingTodoId: null,
      editingTodoLabel: ""
    })
  );
}
