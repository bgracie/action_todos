import * as serviceWorker from "./interface/service_worker";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppContainer } from "./view/AppContainer";
import { Store } from "./framework/store";
import * as LocalStorage from "./interface/localstorage";
import "./view/index.css";
import * as InitialModel from "./framework/initial_model";
import { onHistoryPopState } from "./actions/history";
import { Model } from "./model/model";
import * as Logging from "./interface/logging";

const isModelTriggeringRouteChange = (prevModel: Model, model: Model) =>
  prevModel.pathname !== model.pathname &&
  model.pathname !== window.location.pathname;

const updateUrl = (prevModel: Model, model: Model) => {
  if (isModelTriggeringRouteChange(prevModel, model)) {
    window.history.pushState({}, "", model.pathname);
    Logging.log(`Model update triggered route change to '${model.pathname}'`);
  }
};
const updateLocalStorage = (prevModel: Model, model: Model) =>
  LocalStorage.setStoredState(model);
const storeSubscriptions = [updateUrl, updateLocalStorage];
const store = new Store("Todos", InitialModel.get(), storeSubscriptions);

window.onpopstate = store.bindAction(onHistoryPopState);

ReactDOM.render(
  <AppContainer store={store} />,
  document.getElementById("root") as HTMLElement
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
