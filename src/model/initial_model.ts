import * as LocalStorage from "../interface/localstorage";
import { getCached } from "./cached_model";

export const initialModel = () => {
  return {
    editingTodoId: null,
    newTodoLabel: "",
    editingTodoLabel: "",
    todos: LocalStorage.getStoredState().todos,
    cached: getCached()
  };
};
