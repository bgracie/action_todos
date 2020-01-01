import { Store } from "../framework/store";

export function onHistoryPopState(_store: Store) {
  _store.replaceModel();
}
