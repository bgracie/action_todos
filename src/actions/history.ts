import { Store } from "../framework/store";
import { changePathname } from "../reducers/history";
import { Model } from "../model";
import * as Logging from "../interface/logging";

export function onHistoryPopState(store: Store, model: Model) {
  const newPathname = window.location.pathname;
  Logging.log(`Route change to '${newPathname}' triggering model update`);
  store.replaceModel(changePathname(model, newPathname));
}
