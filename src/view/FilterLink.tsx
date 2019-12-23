import * as React from "react";
import { Model } from "../model";
import { Actor, Store } from "../store";
import classNames from "classnames";
import { onFilterClick } from "../actions";

interface FilterLinkProps {
  model: Model;
  actor: Actor;
  label: string;
  path: string;
}

export class FilterLink extends React.Component<FilterLinkProps> {
  public render() {
    const { model, actor, label, path } = this.props;

    return (
      <li>
        <a
          href="javascript:void(0)"
          className={classNames({
            selected: model.cached.pathname === path
          })}
          onClick={actor(onFilterClick, path)}
        >
          {label}
        </a>
      </li>
    );
  }
}
