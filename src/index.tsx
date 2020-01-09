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

const store = new Store("Todos", InitialModel.get(), window.history);

store.subscribe((prevModel: Model, model: Model) =>
  LocalStorage.setStoredState(model)
);

window.onpopstate = store.bindAction(onHistoryPopState);

ReactDOM.render(
  <AppContainer store={store} />,
  document.getElementById("root") as HTMLElement
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
