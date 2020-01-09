import { Model } from "../model";
import { safeMerge } from "../util/object";

export const changePathname = (model: Model, pathname: string): Model => {
  return safeMerge(model, { pathname: pathname });
};
