import { DefaultProps } from "../store";
import * as React from "react";
import { Main } from "./Main";
import { Footer } from "./Footer";
import { TodoTextInput } from "./TodoTextInput";

export class App extends React.Component<DefaultProps> {
  public render() {
    const model = this.props.model;
    const actor = this.props.actor;

    return (
      <div>
        <header className="header">
          <h1>todos</h1>
          <TodoTextInput model={model} actor={actor} />
          <Main model={model} actor={actor} />
          <Footer model={model} actor={actor} />
        </header>
      </div>
    );
  }
}
