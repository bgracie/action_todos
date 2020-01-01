import * as UrlPath from "../interface/url_path";
import * as Model from "../model/model";

// the model properties for which an external object is the canonical source
// of truth

export interface T {
  pathname: Model.Pathname;
}

export const get = (): T => {
  return {
    pathname: UrlPath.get()
  };
};
