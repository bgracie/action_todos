import { storedTodos } from "./localstorage";
import { getCached } from "./cached_model";

export const initialModel = () => {
  return {
    editingTodoId: null,
    newTodoLabel: "",
    editingTodoLabel: "",
    todos: storedTodos(),
    cached: getCached()
  };
};
