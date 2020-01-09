import { Model } from "../model";
import * as Logging from "../interface/logging";
import * as LocalStorage from "../interface/localstorage";

const isModelTriggeringRouteChange = (prevModel: Model, model: Model) =>
  prevModel.pathname !== model.pathname &&
  model.pathname !== window.location.pathname;

const updateUrl = (prevModel: Model, model: Model) => {
  if (isModelTriggeringRouteChange(prevModel, model)) {
    window.history.pushState({}, "", model.pathname);
    Logging.log(`Model update triggered route change to '${model.pathname}'`);
  }
};

const updateLocalStorage = (prevModel: Model, model: Model) =>
  LocalStorage.setStoredState(model);

export const subscriptions = [updateUrl, updateLocalStorage];
