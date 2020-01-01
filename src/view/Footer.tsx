import * as React from "react";
import { DefaultProps } from "../store";
import { activeTodoCount } from "../model/todos";
import { pluralize } from "../util/string";
import { FilterLink } from "./FilterLink";
import { ClearButton } from "./ClearButton";

export class Footer extends React.Component<DefaultProps> {
  public render() {
    const { model, bindAction } = this.props;

    const _activeCount = activeTodoCount(model);
    const activeTodoWord = pluralize("item", _activeCount);

    if (model.todos.length > 0) {
      return (
        <footer className="footer">
          <span className="todo-count">
            <strong>{_activeCount}</strong> {activeTodoWord} left
          </span>
          <ul className="filters">
            <FilterLink
              model={model}
              bindAction={bindAction}
              label="All"
              path="/"
              key="/"
            />{" "}
            <FilterLink
              model={model}
              bindAction={bindAction}
              label="Active"
              path="/active"
              key="/active"
            />{" "}
            <FilterLink
              model={model}
              bindAction={bindAction}
              label="Completed"
              path="/completed"
              key="/completed"
            />
          </ul>
          <ClearButton model={model} bindAction={bindAction} />
        </footer>
      );
    } else {
      return null;
    }
  }
}
