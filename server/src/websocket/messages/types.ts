import {
  AddProjectMessage,
  AddStatusOrCategoryMessage,
  WebSocketClient,
} from "../types";

export type AddProjectMessageFn = ({
  connectionId,
  message,
}: {
  connectionId: string;
  message: AddProjectMessage;
}) => Promise<void>;
export type AddStatusOrCategoryMessageFn = ({
  connectionId,
  message,
}: {
  connectionId: string;
  message: AddStatusOrCategoryMessage;
}) => Promise<void>;
export type GetCategoryOrStatusMessageFn = ({
  connectionId,
  ws,
}: {
  connectionId: string;
  ws: WebSocketClient;
}) => Promise<void>;
