import {
  CategoryOrStatusBody,
  ProjectBody,
  QueryResponse,
  UserBody,
} from "../../queries/types";

export type AddConnectionFn = ({
  connectionId,
  uid,
}: {
  connectionId: string;
  uid: string;
}) => Promise<QueryResponse>;
export type RemoveConnectionFn = (
  connectionId: string
) => Promise<QueryResponse>;

export type AddProjectFn = ({
  categoriesIds,
  title,
  content,
  statusId,
  connectionId,
}: {
  statusId: string;
  categoriesIds: string[];
  title: string;
  content: string;
  connectionId: string;
}) => Promise<ProjectBody>;

export type AddCategoryStatusFn = ({
  connectionId,
  name,
  color,
}: {
  connectionId: string;
  name: string;
  color: number;
}) => Promise<CategoryOrStatusBody>;

export type GetCategoryStatusFn = ({
  connectionId,
}: {
  connectionId: string;
}) => Promise<CategoryOrStatusBody[]>;

export type RemoveStatus = ({
  connectionId,
  statusId,
}: {
  connectionId: string;
  statusId: string;
}) => Promise<CategoryOrStatusBody>;

export type RemoveCategory = ({
  connectionId,
  categoryId,
}: {
  connectionId: string;
  categoryId: string;
}) => Promise<CategoryOrStatusBody>;

export type EnableOrDisableAccountFn = (payload: {
  connectionId: string;
  uid: string;
}) => Promise<UserBody>;
export type GetUsersFn = (payload: {
  connectionId: string;
  offsetUid?: string;
}) => Promise<UserBody[]>;
export type GetProjectsFn = (payload: {
  connectionId: string;
  offsetId?: string;
}) => Promise<ProjectBody[]>;
