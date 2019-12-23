import * as React from "react";
import { Model, Todo } from "../model";
import { Actor } from "../store";
import classNames from "classnames";
import * as Actions from "../actions";

interface TodoItemProps {
  model: Model;
  actor: Actor;
  todo: Todo;
}

export class TodoItem extends React.Component<TodoItemProps> {
  private inputElem!: HTMLInputElement;
  public componentDidUpdate(prevProps: TodoItemProps) {
    if (!this.isEditing(prevProps) && this.isEditing(this.props)) {
      const elem = this.inputElem;

      elem.focus();
      elem.setSelectionRange(elem.value.length, elem.value.length);
    }
  }
  public render() {
    const { model, actor, todo } = this.props;

    const isEditing = this.isEditing(this.props);

    return (
      <li
        className={classNames({
          completed: todo.completed,
          editing: isEditing
        })}
      >
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={todo.completed}
            onChange={actor(Actions.completeOne, todo.id)}
          />
          <label onDoubleClick={actor(Actions.editTodo, todo.id)}>
            {todo.label}
          </label>
          <button
            className="destroy"
            onClick={actor(Actions.destroyTodo, todo.id)}
          />
        </div>
        <input
          className="edit"
          ref={element => {
            this.inputElem = element as HTMLInputElement;
          }}
          value={model.editingTodoLabel}
          onBlur={actor(Actions.onTodoBlur)}
          onChange={actor(Actions.onTodoChange)}
          onKeyDown={actor(Actions.onTodoKeyDown)}
        />
      </li>
    );
  }
  private isEditing(props: TodoItemProps) {
    return props.model.editingTodoId === props.todo.id;
  }
}
