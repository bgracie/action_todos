import * as React from "react";
import { Model, Todo, TodoId } from "../model";
import { Actor, Store } from "../store";
import { safeMerge } from "../utilities";
import classNames from "classnames";
import { findTodoIndex, findTodo } from "../lib/todos";
import { submitTodo } from "../actions/todos";
import * as Keyboard from "../lib/keyboard";

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
            onChange={actor(completeOne, todo.id)}
          />
          <label onDoubleClick={actor(editTodo, todo.id)}>{todo.label}</label>
          <button className="destroy" onClick={actor(destroyTodo, todo.id)} />
        </div>
        <input
          className="edit"
          ref={element => {
            this.inputElem = element as HTMLInputElement;
          }}
          value={model.editingTodoLabel}
          onBlur={actor(onTodoBlur)}
          onChange={actor(onTodoChange)}
          onKeyDown={actor(onTodoKeyDown)}
        />
      </li>
    );
  }
  private isEditing(props: TodoItemProps) {
    return props.model.editingTodoId === props.todo.id;
  }
}

function completeOne(store: Store, todoId: TodoId) {
  const _model = store.model();
  const _todos = _model.todos.slice(0);
  const _index = findTodoIndex(_model, todoId);

  _todos[_index] = safeMerge(_todos[_index], { completed: true });

  store.replaceModel(safeMerge(_model, { todos: _todos }));
}

function editTodo(store: Store, todoId: TodoId) {
  const _model = store.model();
  const todo = findTodo(_model, todoId);

  store.replaceModel(
    safeMerge(_model, { editingTodoId: todoId, editingTodoLabel: todo.label })
  );
}

function destroyTodo(store: Store, todoId: TodoId) {
  const _model = store.model();
  const todos = _model.todos.filter(_todo => {
    return _todo.id !== todoId;
  });

  store.replaceModel(safeMerge(_model, { todos: todos }));
}

function onTodoBlur(store: Store) {
  submitTodo(store);
}

export function onTodoChange(store: Store, event: React.KeyboardEvent) {
  const _model = store.model();

  store.replaceModel(
    safeMerge(_model, {
      editingTodoLabel: (event.target as HTMLInputElement).value
    })
  );
}

export function onTodoKeyDown(store: Store, event: React.KeyboardEvent) {
  const _model = store.model();

  if (event.which === Keyboard.KeyCodeEnter) {
    submitTodo(store);
  } else if (event.which === Keyboard.KeyCodeEscape) {
    store.replaceModel(
      safeMerge(_model, { editingTodoLabel: "", editingTodoId: null })
    );
  }
}
