import {
  AddProjectMessage,
  AddStatusOrCategoryMessage,
  ChangeAccountStateMessage,
  GetProjectsMessage,
  GetUsersMessage,
  RemoveStatusOrCategoryMessage,
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
export type GetStatusAndCategoryMessageFn = ({
  connectionId,
  ws,
}: {
  connectionId: string;
  ws: WebSocketClient;
}) => Promise<void>;
export type RemoveStatusOrCategoryMessageFn = ({
  connectionId,
  message,
}: {
  connectionId: string;
  message: RemoveStatusOrCategoryMessage;
}) => Promise<void>;
export type ChangeAccountStateMessageFn = ({
  connectionId,
  message,
}: {
  connectionId: string;
  message: ChangeAccountStateMessage;
}) => Promise<void>;
export type GetUsersMessageFn = (payload: {
  ws: WebSocketClient;
  message: GetUsersMessage;
}) => Promise<void>;
export type GetProjectsMessageFn = (payload: {
  ws: WebSocketClient;
  message: GetProjectsMessage;
}) => Promise<void>;
