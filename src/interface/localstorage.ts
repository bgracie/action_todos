import * as Model from "../model/model";

export interface StoredState {
  todos: Model.Todo[];
}

export const StoredStateKey = "todoState";

export const getStoredState = (): StoredState => {
  const raw = window.localStorage.getItem(StoredStateKey);

  if (raw !== null) {
    return JSON.parse(raw);
  } else {
    return { todos: [] };
  }
};

export const setStoredState = (model: Model.Model) => {
  window.localStorage.setItem(
    StoredStateKey,
    JSON.stringify({ todos: model.todos })
  );
};
