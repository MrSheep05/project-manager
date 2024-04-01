export type Result<E, R> = Err<E> | Ok<R> | undefined;
export enum Results {
  Error,
  Ok,
}
interface Err<T> {
  result: Results.Error;
  payload: T;
}
interface Ok<T> {
  result: Results.Ok;
  payload: T;
}

export const Ok = <T>(payload: T): Ok<T> => {
  return {
    result: Results.Ok,
    payload,
  };
};

export const Err = <T>(payload: T): Err<T> => {
  return {
    result: Results.Error,
    payload,
  };
};
