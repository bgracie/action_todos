import * as React from "react";
import * as Keyboard from "../lib/keyboard";
import { DefaultProps, Store } from "../store";
import { safeMerge } from "../utilities";
import { newTodo } from "../lib/todos";

export class TodoTextInput extends React.Component<DefaultProps> {
  public render() {
    const { model, actor } = this.props;

    return (
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        value={model.newTodoLabel}
        onKeyDown={actor(onNewTodoKeyDown)}
        onChange={actor(onNewTodoChange)}
        autoFocus={true}
      />
    );
  }
}

function onNewTodoKeyDown(store: Store, event: React.KeyboardEvent) {
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

function onNewTodoChange(store: Store, event: React.KeyboardEvent) {
  store.replaceModel(
    safeMerge(store.model(), {
      newTodoLabel: (event.target as HTMLInputElement).value
    })
  );
}
