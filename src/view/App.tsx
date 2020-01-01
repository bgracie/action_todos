import { DefaultProps } from "../framework/store";
import * as React from "react";
import { Main } from "./Main";
import { Footer } from "./Footer";
import { TodoTextInput } from "./TodoTextInput";

export class App extends React.Component<DefaultProps> {
  public render() {
    const model = this.props.model;
    const bindAction = this.props.bindAction;

    return (
      <div>
        <header className="header">
          <h1>todos</h1>
          <TodoTextInput model={model} bindAction={bindAction} />
          <Main model={model} bindAction={bindAction} />
          <Footer model={model} bindAction={bindAction} />
        </header>
      </div>
    );
  }
}
