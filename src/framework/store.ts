import * as Logging from "../interface/logging";
import { Model } from "../model/model";

export type BoundAction = (...args: any[]) => any;
export type UnboundAction = (store: Store, model: Model, ...rest: any[]) => any;
export type Subscription = (prevModel: Model, model: Model) => any;

export type BindAction = typeof Store.prototype.bindAction;

export interface DefaultProps {
  model: Model;
  bindAction: BindAction;
}

export class Store {
  private _model: Model;
  private _name: string;
  private _subscriptions: Subscription[];
  private _modelVersion: number;
  constructor(
    name: string,
    initialModel: Model,
    subscriptions: Subscription[]
  ) {
    this._model = initialModel;
    this._name = name;
    this._subscriptions = subscriptions;
    this._modelVersion = 0;

    Logging.log(
      `%cCreating store ${name} with model version ${this._modelVersion}:`,
      "font-weight: bold"
    );
    Logging.log(this.model());
  }
  public model(): Model {
    return this._model;
  }
  public replaceModel(newModel: Model) {
    const prevModel = this.model();
    this._model = newModel;
    this._modelVersion++;
    Logging.log(
      `%cModel version ${this._modelVersion} for ${this._name} store:`,
      "color: green"
    );
    Logging.log(newModel);
    this.notifySubscribers(prevModel, newModel);
  }
  public bindAction = (
    unboundAction: UnboundAction,
    ...bindArgs: any[]
  ): BoundAction => {
    return (...dynamicArgs: any[]) => {
      Logging.log(
        `%cActing with ${unboundAction.name}, ${bindArgs} ${dynamicArgs}`,
        "font-weight: bold"
      );

      unboundAction(this, this.model(), ...bindArgs, ...dynamicArgs);
    };
  };
  public subscribe(subscription: Subscription) {
    this._subscriptions.push(subscription);
  }
  private notifySubscribers(prevModel: Model, newModel: Model) {
    this._subscriptions.forEach(subscription => {
      subscription(prevModel, newModel);
    });
  }
}
