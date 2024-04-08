import { IncomingMessage } from "http";

interface WebSocketClient extends WebSocket {
  connectionId: string;
}
export type OnConnectFn = (
  socket: WebSocketClient,
  request: IncomingMessage,
  ...args: [{ uid: string }, ...any[]]
) => Promise<void>;
