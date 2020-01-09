import * as React from "react";
import { DefaultProps } from "../framework/store";
import { onNewTodoInputKeyDown, onNewTodoInputChange } from "../actions/todos";

export class NewTodoInput extends React.Component<DefaultProps> {
  public render() {
    const { model, bindAction } = this.props;

    return (
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        value={model.newTodoLabel}
        onKeyDown={bindAction(onNewTodoInputKeyDown)}
        onChange={bindAction(onNewTodoInputChange)}
        autoFocus={true}
      />
    );
  }
}
