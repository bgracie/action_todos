import * as LocalStorage from "../interface/localstorage";
import * as Model from "../model/model";

export const get = (): Model.Model => {
  return {
    editingTodoId: null,
    newTodoLabel: "",
    editingTodoLabel: "",
    todos: LocalStorage.getStoredState().todos,
    pathname: window.location.pathname
  };
};
