export const log = (toLog: any, styles?: string) => {
  if (process.env.NODE_ENV !== "production") {
    if (styles) {
      console.log(toLog, styles);
    } else {
      console.log(toLog);
    }
  }
};
