export type PostFn = <T>(data: { body: Object; path: String }) => Promise<T>;
