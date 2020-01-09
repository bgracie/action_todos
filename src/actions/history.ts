import { Store } from "../framework/store";
import { safeMerge } from "../util/object";
import * as Logging from "../interface/logging";

export function onHistoryPopState(_store: Store) {
  Logging.log(
    `Route change to '${window.location.pathname}' triggering model update`
  );
  _store.replaceModel(
    safeMerge(_store.model(), { pathname: window.location.pathname })
  );
}
