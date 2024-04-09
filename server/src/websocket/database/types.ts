import { ProjectBody, QueryResponse } from "../../queries/types";

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
