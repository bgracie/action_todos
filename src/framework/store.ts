import * as Logger from "../interface/logging";
import { Model } from "../model/model";
import * as NoncanonicalModelProperties from "./noncanonical_model_properties";
import { safeMerge } from "../util/object";

export type BoundAction = (...args: any[]) => any;
export type UnboundAction = (store: Store, ...rest: any[]) => any;
export type Subscription = (prevModel: Model, model: Model) => any;

export type BindAction = typeof Store.prototype.bindAction;

export interface DefaultProps {
  model: Model;
  bindAction: BindAction;
}

export class Store {
  private _model: Model;
  private _name: string;
  private _history: typeof window.history;
  private _subscriptions: Subscription[];
  private _modelVersion: number;
  private _getNoncanonicalModelProperties: typeof NoncanonicalModelProperties.get;
  constructor(
    name: string,
    initialModel: Model,
    history: typeof window.history
  ) {
    this._history = history;
    this._model = initialModel;
    this._name = name;
    this._subscriptions = [];
    this._modelVersion = 0;
    this._getNoncanonicalModelProperties = NoncanonicalModelProperties.get;

    Logger.log(
      `%cCreating store ${name} with model version ${this._modelVersion}:`,
      "font-weight: bold"
    );
    Logger.log(this.model());
  }
  public model(): Model {
    return this._model;
  }
  public changeRoute(newRoute: string) {
    this._history.pushState({}, "", newRoute);
  }
  public replaceModel(newModel?: Model) {
    const currentModel = this.model();
    if (newModel) {
      this._model = Object.assign(
        newModel,
        this._getNoncanonicalModelProperties()
      );
    } else {
      this._model = safeMerge(
        this.model(),
        this._getNoncanonicalModelProperties()
      );
    }
    this._modelVersion++;
    Logger.log(
      `%cModel version ${this._modelVersion} for ${this._name} store:`,
      "color: green"
    );
    Logger.log(this.model());
    this.notifySubscribers(currentModel);
  }
  public bindAction = (
    unboundAction: UnboundAction,
    ...actionDetails: any[]
  ): BoundAction => {
    return (...args: any[]) => {
      Logger.log(
        `%cActing with ${unboundAction.name}, ${actionDetails}`,
        "font-weight: bold"
      );

      unboundAction(this, ...actionDetails, ...args);
    };
  };
  public subscribe(subscription: Subscription) {
    this._subscriptions.push(subscription);
  }
  private notifySubscribers(prevModel: Model) {
    this._subscriptions.forEach(sub => {
      sub(prevModel, this.model());
    });
  }
}
