import { MessageObject, OnMessageFn } from "./on-message.types";

export const onMessage: OnMessageFn = (data) => {
  try {
    const message = JSON.parse(data) as MessageObject;
    if (!message || !message.message || !message.payload) return;
    return message;
  } catch {
    return;
  }
};
