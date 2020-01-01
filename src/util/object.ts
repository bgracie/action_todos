export function safeMerge<T>(updating: T, updateWith: object): T {
  return Object.assign({}, updating, updateWith);
}
