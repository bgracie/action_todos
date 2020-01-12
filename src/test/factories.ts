import { Model } from "../model";
import { Store, BindAction } from "../store";

export const model = (): Model => {
  return {
    editingTodoId: null,
    newTodoLabel: "",
    editingTodoLabel: "",
    todos: [],
    pathname: "/"
  };
};

export const store = (): Store => {
  return new Store("Todos", model(), []);
};

export const bindAction = (): BindAction => {
  return store().bindAction;
};
