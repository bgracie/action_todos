export const StoredStateKey = "todoState";

export const storedTodos = () => {
  const raw = window.localStorage.getItem(StoredStateKey);

  if (raw !== null) {
    return JSON.parse(raw).todos;
  } else {
    return [];
  }
};
