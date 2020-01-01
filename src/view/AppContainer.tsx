import * as React from "react";
import { Store } from "../store";
import { App } from "./App";

interface AppContainerProps {
  store: Store;
}

export class AppContainer extends React.Component<AppContainerProps> {
  public componentDidMount() {
    this.props.store.subscribe(() => {
      this.forceUpdate();
    });
  }
  public render() {
    const model = this.props.store.model();
    const bindAction = this.props.store.bindAction;

    return <App model={model} bindAction={bindAction} />;
  }
}
