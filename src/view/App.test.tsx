import * as React from "react";
import { App } from "./App";
import * as InitialModel from "../model/initial_model";
import { Store } from "../store";
import "../test/setup_tests";
import { render } from "@testing-library/react";

test("renders learn react link", () => {
  const store = new Store("Todos", InitialModel.get(), window.history);
  const { getByText } = render(
    <App model={InitialModel.get()} bindAction={store.bindAction} />
  );
  const title = getByText(/todos/i);
  expect(title).toBeInTheDocument();
});
