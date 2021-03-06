import * as React from "react";
import { DefaultProps } from "../store";
import { completedTodoCount } from "../selectors/todos";
import { onClearCompletedClick } from "../actions/todos";

export class ClearButton extends React.Component<DefaultProps> {
  public render() {
    const { model, bindAction } = this.props;

    if (completedTodoCount(model) > 0) {
      return (
        <button
          className="clear-completed"
          onClick={bindAction(onClearCompletedClick)}
        >
          Clear completed
        </button>
      );
    } else {
      return null;
    }
  }
}
