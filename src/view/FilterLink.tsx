import * as React from "react";
import { Model } from "../model/model";
import { BindAction } from "../framework/store";
import classNames from "classnames";
import { onFilterClick } from "../actions";

interface FilterLinkProps {
  model: Model;
  bindAction: BindAction;
  label: string;
  path: string;
}

export class FilterLink extends React.Component<FilterLinkProps> {
  public render() {
    const { model, bindAction, label, path } = this.props;

    return (
      <li>
        <a
          href="javascript:void(0)"
          className={classNames({
            selected: model.pathname === path
          })}
          onClick={bindAction(onFilterClick, path)}
        >
          {label}
        </a>
      </li>
    );
  }
}
