import * as Logger from "./logger";
import { Model, Cached } from "./model";
import { safeMerge } from "./utilities";

export type ConcreteAction = (...args: any[]) => any;
export type AbstractAction = (store: Store, ...rest: any[]) => any;
export type Subscription = (model: Model) => any;

export type Actor = typeof Store.prototype.actor;

export interface DefaultProps {
  model: Model;
  actor: Actor;
}

export type GetCached = () => Cached;

export class Store {
  private _model: Model;
  private _name: string;
  private _history: typeof window.history;
  private _subscriptions: Subscription[];
  private _modelVersion: number;
  private _getCached: GetCached;
  constructor(
    name: string,
    initialModel: Model,
    history: typeof window.history,
    getCached: GetCached
  ) {
    this._history = history;
    this._model = initialModel;
    this._name = name;
    this._getCached = getCached;
    this._subscriptions = [];
    this._modelVersion = 0;
    this.actor = this.actor.bind(this);

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
    if (newModel) {
      this._model = safeMerge(newModel, { cached: this._getCached() });
    } else {
      this._model = safeMerge(this.model(), { cached: this._getCached() });
    }
    this._modelVersion++;
    Logger.log(
      `%cModel version ${this._modelVersion} for ${this._name} store:`,
      "color: green"
    );
    Logger.log(this.model());
    this.notifySubscribers();
  }
  public refresh() {
    this.replaceModel();
  }
  public actor(
    abstractAction: AbstractAction,
    ...actionDetails: any[]
  ): ConcreteAction {
    return (...args: any[]) => {
      Logger.log(
        `%cActing with ${abstractAction.name}, ${actionDetails}`,
        "font-weight: bold"
      );

      abstractAction(this, ...actionDetails, ...args);
    };
  }
  public subscribe(subscription: Subscription) {
    this._subscriptions.push(subscription);
  }
  private notifySubscribers() {
    this._subscriptions.forEach(sub => {
      sub(this.model());
    });
  }
}
