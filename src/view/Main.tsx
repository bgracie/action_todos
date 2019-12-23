import * as React from "react";
import { DefaultProps } from "../store";
import { activeTodoCount, shownTodos } from "../lib/todos";
import { TodoItem } from "./TodoItem";
import { completeAll } from "../actions";

export class Main extends React.Component<DefaultProps> {
  public render() {
    const { model, actor } = this.props;

    return (
      <section className="main">
        <input
          id="toggle-all"
          className="toggle-all"
          type="checkbox"
          onChange={actor(completeAll)}
          checked={activeTodoCount(model) === 0}
        />
        <label htmlFor="toggle-all" />
        <ul className="todo-list">
          {shownTodos(model).map(_todo => {
            return (
              <TodoItem
                model={model}
                todo={_todo}
                actor={actor}
                key={_todo.id}
              />
            );
          })}
        </ul>
      </section>
    );
  }
}
