export type Tokens = {
  refreshToken: String;
  accessToken: string;
};
export type WidgetProps = {
  children: JSX.Element | JSX.Element[];
};

export type ComponentWrapper = (data: WidgetProps) => JSX.Element;

export type CategoryOrStatusBody = {
  id: string;
  name: string;
  color: string;
  visible: boolean;
};

export type ProjectBody = {
  project_id: string;
  user_id: string;
  status: CategoryOrStatusBody;
  categories: CategoryOrStatusBody[];
  title: string;
  content: string;
  timestamp: number;
};

export type UserBody = {
  id: string;
  email: string;
  role: Role;
  enabled: boolean;
};

export enum Role {
  Admin = "admin",
  User = "user",
}

export type UserInfo = {
  picture?: string;
  user_id: string;
  name?: string;
  email: string;
  role: Role;
  enabled: boolean;
};
