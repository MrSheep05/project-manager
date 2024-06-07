export type Tokens = {
  refreshToken: string;
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
  id: string;
  project_id: string;
  user_id: string;
  user_email: string;
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
  id: string;
  name?: string;
  email: string;
  role: Role;
  enabled: boolean;
};

export type UpdateStatusOrCategoryFn = ({
  payload,
  current,
}: {
  current: CategoryOrStatusBody[];
  payload?: CategoryOrStatusBody[] | CategoryOrStatusBody;
}) => CategoryOrStatusBody[];
