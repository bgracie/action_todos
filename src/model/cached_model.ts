import * as UrlPath from "../interface/url_path";

export const getCached = () => {
  return {
    pathname: UrlPath.get()
  };
};
