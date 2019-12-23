export function safeMerge<T>(updating: T, updateWith: object): T {
  return Object.assign({}, updating, updateWith);
}

export function uuid() {
  /*jshint bitwise:false */
  let i;
  let random;
  let _uuid = "";

  for (i = 0; i < 32; i++) {
    random = (Math.random() * 16) | 0;
    if (i === 8 || i === 12 || i === 16 || i === 20) {
      _uuid += "-";
    }
    _uuid += (i === 12 ? 4 : i === 16 ? (random & 3) | 8 : random).toString(16);
  }

  return _uuid;
}

export function pluralize(count: number, word: string) {
  return count === 1 ? word : word + "s";
}
