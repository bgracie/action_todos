import * as React from "react";
import { DefaultProps } from "../framework/store";
import { activeTodoCount, shownTodos } from "../model/todos";
import { TodoItem } from "./TodoItem";
import { onCompleteAllClick } from "../actions/todos";

export class Main extends React.Component<DefaultProps> {
  public render() {
    const { model, bindAction } = this.props;

    return (
      <section className="main">
        <input
          id="toggle-all"
          className="toggle-all"
          type="checkbox"
          onChange={bindAction(onCompleteAllClick)}
          checked={activeTodoCount(model) === 0}
        />
        <label htmlFor="toggle-all" />
        <ul className="todo-list">
          {shownTodos(model).map(_todo => {
            return (
              <TodoItem
                model={model}
                todo={_todo}
                bindAction={bindAction}
                key={_todo.id}
              />
            );
          })}
        </ul>
      </section>
    );
  }
}
