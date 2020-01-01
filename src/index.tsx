import * as serviceWorker from "./interface/service_worker";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppContainer } from "./view/AppContainer";
import { Store } from "./store";
import * as LocalStorage from "./interface/localstorage";
import "./view/index.css";
import { getCached } from "./model/cached_model";
import { initialModel } from "./model/initial_model";
import { onPopState } from "./actions";

const store = new Store("Todos", initialModel(), window.history, getCached);

store.subscribe(LocalStorage.setStoredState);

window.onpopstate = store.bindAction(onPopState);

ReactDOM.render(
  <AppContainer store={store} />,
  document.getElementById("root") as HTMLElement
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
