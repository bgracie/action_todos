import * as React from "react";
import { Model, Todo } from "../model/model";
import { BindAction } from "../framework/store";
import classNames from "classnames";
import * as Actions from "../actions/todos";

interface TodoItemProps {
  model: Model;
  bindAction: BindAction;
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
    const { model, bindAction, todo } = this.props;

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
            onChange={bindAction(Actions.onTodoCheckboxClick, todo.id)}
          />
          <label onDoubleClick={bindAction(Actions.onTodoDoubleClick, todo.id)}>
            {todo.label}
          </label>
          <button
            className="destroy"
            onClick={bindAction(Actions.onTodoXClick, todo.id)}
          />
        </div>
        <input
          className="edit"
          ref={element => {
            this.inputElem = element as HTMLInputElement;
          }}
          value={model.editingTodoLabel}
          onBlur={bindAction(Actions.onTodoBlur)}
          onChange={bindAction(Actions.onTodoChange)}
          onKeyDown={bindAction(Actions.onTodoKeyDown)}
        />
      </li>
    );
  }
  private isEditing(props: TodoItemProps) {
    return props.model.editingTodoId === props.todo.id;
  }
}
