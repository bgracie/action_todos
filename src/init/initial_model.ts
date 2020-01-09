import * as LocalStorage from "../browser/localstorage";
import * as Model from "../model";

export const get = (): Model.Model => {
  return {
    editingTodoId: null,
    newTodoLabel: "",
    editingTodoLabel: "",
    todos: LocalStorage.getStoredState().todos,
    pathname: window.location.pathname
  };
};
