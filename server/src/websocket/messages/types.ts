import {
  AddProjectMessage,
  AddStatusOrCategoryMessage,
  ChangeAccountStateMessage,
  GetProjectsMessage,
  GetUsersMessage,
  RemoveStatusOrCategoryMessage,
  UpdateProjectMessage,
} from "../types";
import { WebSocket } from "ws";

export type AddProjectMessageFn = ({
  connectionId,
  message,
}: {
  connectionId: string;
  message: AddProjectMessage;
}) => Promise<void>;

export type UpdateProjectMessageFn = ({
  connectionId,
  message,
}: {
  connectionId: string;
  message: UpdateProjectMessage;
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
  ws: WebSocket;
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
  ws: WebSocket;
  message: GetUsersMessage;
}) => Promise<void>;
export type GetProjectsMessageFn = (payload: {
  ws: WebSocket;
  message: GetProjectsMessage;
}) => Promise<void>;
