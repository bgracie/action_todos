import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./App";
import { getCached } from "../lib/cached_model";
import { initialModel } from "../lib/initial_model";
import { Store } from "../store";

import { render } from "@testing-library/react";

test("renders learn react link", () => {
  const store = new Store("Todos", initialModel(), window.history, getCached);
  const { getByText } = render(
    <App model={initialModel()} bindAction={store.bindAction} />
  );
  const title = getByText(/todos/i);
  expect(title).toBeInTheDocument();
});
