export type Tokens = {
  refreshToken: String;
  accessToken: string;
};

export type ComponentWrapper = (data: {
  children: JSX.Element | JSX.Element[];
}) => JSX.Element;
