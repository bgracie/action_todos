import * as React from "react";
import { App } from "./App";
import { getCached } from "../model/cached_model";
import { initialModel } from "../model/initial_model";
import { Store } from "../store";
import "../test/setup_tests";
import { render } from "@testing-library/react";

test("renders learn react link", () => {
  const store = new Store("Todos", initialModel(), window.history, getCached);
  const { getByText } = render(
    <App model={initialModel()} bindAction={store.bindAction} />
  );
  const title = getByText(/todos/i);
  expect(title).toBeInTheDocument();
});
