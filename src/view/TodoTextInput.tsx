import * as React from "react";
import { DefaultProps } from "../framework/store";
import { onTodoInputKeyDown, onTodoInputChange } from "../actions/todos";

export class TodoTextInput extends React.Component<DefaultProps> {
  public render() {
    const { model, bindAction } = this.props;

    return (
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        value={model.newTodoLabel}
        onKeyDown={bindAction(onTodoInputKeyDown)}
        onChange={bindAction(onTodoInputChange)}
        autoFocus={true}
      />
    );
  }
}
