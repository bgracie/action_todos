import * as React from "react";
import { DefaultProps } from "../store";
import { completedTodoCount } from "../lib/todos";
import { onClearCompleted } from "../actions";

export class ClearButton extends React.Component<DefaultProps> {
  public render() {
    const { model, bindAction } = this.props;

    if (completedTodoCount(model) > 0) {
      return (
        <button
          className="clear-completed"
          onClick={bindAction(onClearCompleted)}
        >
          Clear completed
        </button>
      );
    } else {
      return null;
    }
  }
}
