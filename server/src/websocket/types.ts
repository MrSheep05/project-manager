import { IncomingMessage } from "http";

export type OnConnectFn = (
  socket: WebSocket,
  request: IncomingMessage
) => Promise<void>;
