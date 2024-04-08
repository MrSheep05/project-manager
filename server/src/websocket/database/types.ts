import { QueryResponse } from "../../queries/types";

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
