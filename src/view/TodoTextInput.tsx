import * as React from "react";
import { DefaultProps } from "../store";
import { onNewTodoKeyDown, onNewTodoChange } from "../actions";

export class TodoTextInput extends React.Component<DefaultProps> {
  public render() {
    const { model, bindAction } = this.props;

    return (
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        value={model.newTodoLabel}
        onKeyDown={bindAction(onNewTodoKeyDown)}
        onChange={bindAction(onNewTodoChange)}
        autoFocus={true}
      />
    );
  }
}