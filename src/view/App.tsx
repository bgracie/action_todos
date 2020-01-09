import { DefaultProps } from "../framework/store";
import * as React from "react";
import { Main } from "./Main";
import { Footer } from "./Footer";
import { NewTodoInput } from "./NewTodoInput";

export class App extends React.Component<DefaultProps> {
  public render() {
    const model = this.props.model;
    const bindAction = this.props.bindAction;

    return (
      <div>
        <header className="header">
          <h1>todos</h1>
          <NewTodoInput model={model} bindAction={bindAction} />
          <Main model={model} bindAction={bindAction} />
          <Footer model={model} bindAction={bindAction} />
        </header>
      </div>
    );
  }
}
