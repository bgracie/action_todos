import * as React from "react";
import { DefaultProps } from "../store";
import { activeTodoCount } from "../lib/todos";
import * as Utilities from "../utilities";
import { FilterLink } from "./FilterLink";
import { ClearButton } from "./ClearButton";

export class Footer extends React.Component<DefaultProps> {
  public render() {
    const { model, actor } = this.props;

    const _activeCount = activeTodoCount(model);
    const activeTodoWord = Utilities.pluralize(_activeCount, "item");

    if (model.todos.length > 0) {
      return (
        <footer className="footer">
          <span className="todo-count">
            <strong>{_activeCount}</strong> {activeTodoWord} left
          </span>
          <ul className="filters">
            <FilterLink
              model={model}
              actor={actor}
              label="All"
              path="/"
              key="/"
            />{" "}
            <FilterLink
              model={model}
              actor={actor}
              label="Active"
              path="/active"
              key="/active"
            />{" "}
            <FilterLink
              model={model}
              actor={actor}
              label="Completed"
              path="/completed"
              key="/completed"
            />
          </ul>
          <ClearButton model={model} actor={actor} />
        </footer>
      );
    } else {
      return null;
    }
  }
}
