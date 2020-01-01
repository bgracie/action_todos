import { Store } from "./framework/store";
import { TodoId } from "./model/model";
import { safeMerge } from "./util/object";
import { findTodoIndex, findTodo, newTodo } from "./model/todos";
import * as Keyboard from "./interface/keyboard";
import { Todo } from "./model/model";

export function submitTodo(store: Store) {
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
}

export function completeOne(store: Store, todoId: TodoId) {
  const _model = store.model();
  const _todos = _model.todos.slice(0);
  const _index = findTodoIndex(_model, todoId);

  _todos[_index] = safeMerge(_todos[_index], { completed: true });

  store.replaceModel(safeMerge(_model, { todos: _todos }));
}

export function editTodo(store: Store, todoId: TodoId) {
  const _model = store.model();
  const todo = findTodo(_model, todoId);

  store.replaceModel(
    safeMerge(_model, { editingTodoId: todoId, editingTodoLabel: todo.label })
  );
}

export function destroyTodo(store: Store, todoId: TodoId) {
  const _model = store.model();
  const todos = _model.todos.filter(_todo => {
    return _todo.id !== todoId;
  });

  store.replaceModel(safeMerge(_model, { todos: todos }));
}

export function onTodoBlur(store: Store) {
  submitTodo(store);
}

export function onTodoChange(store: Store, event: React.KeyboardEvent) {
  const _model = store.model();

  store.replaceModel(
    safeMerge(_model, {
      editingTodoLabel: (event.target as HTMLInputElement).value
    })
  );
}

export function onTodoKeyDown(store: Store, event: React.KeyboardEvent) {
  const _model = store.model();

  if (event.which === Keyboard.KeyCodeEnter) {
    submitTodo(store);
  } else if (event.which === Keyboard.KeyCodeEscape) {
    store.replaceModel(
      safeMerge(_model, { editingTodoLabel: "", editingTodoId: null })
    );
  }
}

export function onNewTodoKeyDown(store: Store, event: React.KeyboardEvent) {
  if (event.keyCode !== Keyboard.KeyCodeEnter) {
    return;
  }

  event.preventDefault();

  const val = (event.target as HTMLInputElement).value;
  const _model = store.model();

  if (val) {
    store.replaceModel(
      safeMerge(_model, {
        todos: _model.todos.concat(newTodo(val)),
        newTodoLabel: ""
      })
    );
  }
}

export function onNewTodoChange(store: Store, event: React.KeyboardEvent) {
  store.replaceModel(
    safeMerge(store.model(), {
      newTodoLabel: (event.target as HTMLInputElement).value
    })
  );
}

export function onPopState(_store: Store) {
  _store.replaceModel();
}

export function onFilterClick(store: Store, newRoute: string) {
  store.changeRoute(newRoute);
  store.replaceModel();
}

export function onClearCompleted(store: Store) {
  const _model = store.model();
  const _todos = _model.todos.filter(_todo => {
    return !_todo.completed;
  });

  store.replaceModel(safeMerge(_model, { todos: _todos }));
}

export function completeAll(store: Store) {
  const _model = store.model();

  store.replaceModel(
    safeMerge(_model, {
      todos: _model.todos.map((_todo: Todo) =>
        safeMerge(_todo, { completed: true })
      )
    })
  );
}
