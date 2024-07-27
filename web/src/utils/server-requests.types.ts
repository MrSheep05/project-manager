export type PostFn = (data: {
  body: Object;
  path: String;
}) => Promise<Response>;
