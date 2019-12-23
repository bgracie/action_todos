import * as React from "react";
import { DefaultProps, Store } from "../store";
import { completedTodoCount } from "../lib/todos";
import * as Utilities from "../utilities";

export class ClearButton extends React.Component<DefaultProps> {
  public render() {
    const { model, actor } = this.props;

    if (completedTodoCount(model) > 0) {
      return (
        <button className="clear-completed" onClick={actor(onClearCompleted)}>
          Clear completed
        </button>
      );
    } else {
      return null;
    }
  }
}

export function onClearCompleted(store: Store) {
  const _model = store.model();
  const _todos = _model.todos.filter(_todo => {
    return !_todo.completed;
  });

  store.replaceModel(Utilities.safeMerge(_model, { todos: _todos }));
}
