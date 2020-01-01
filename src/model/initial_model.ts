import * as LocalStorage from "../interface/localstorage";
import * as Model from "./model";
import * as NoncanonicalModelProperties from "./noncanonical_model_properties";

export const get = (): Model.Model => {
  const canonicalModelProperties = {
    editingTodoId: null,
    newTodoLabel: "",
    editingTodoLabel: "",
    todos: LocalStorage.getStoredState().todos
  };

  return Object.assign(
    canonicalModelProperties,
    NoncanonicalModelProperties.get()
  );
};
