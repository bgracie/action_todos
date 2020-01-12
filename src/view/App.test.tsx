import * as React from "react";
import { App } from "./App";
import * as Factories from "../test/factories";
import "../test/setup_tests";
import { render } from "@testing-library/react";

test("renders learn react link", () => {
  const { getByText } = render(
    <App model={Factories.model()} bindAction={Factories.bindAction()} />
  );
  const title = getByText(/todos/i);
  expect(title).toBeInTheDocument();
});
