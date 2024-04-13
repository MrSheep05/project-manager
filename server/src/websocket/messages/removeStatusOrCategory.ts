import { postToConnections } from "..";
import { removeCategory, removeStatus } from "../database";
import { Action } from "../types";
import { RemoveStatusOrCategoryMessageFn } from "./types";

export const removeStatusOrCategoryMessage: RemoveStatusOrCategoryMessageFn =
  async ({ message, connectionId }) => {
    const { payload, action } = message;
    const { id } = payload;
    const result =
      action === Action.RemoveStatus
        ? await removeStatus({ connectionId, statusId: id })
        : await removeCategory({ connectionId, categoryId: id });
    postToConnections({
      everyone: true,
      message: JSON.stringify({ action, payload: result }),
    });
  };
