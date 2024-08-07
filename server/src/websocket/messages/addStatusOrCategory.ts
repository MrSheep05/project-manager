import { postToConnections } from "..";
import { println } from "../../log";
import { addCategory, addStatus } from "../database";
import { Action } from "../types";
import { AddStatusOrCategoryMessageFn } from "./types";

export const addStatusOrCategoryMessage: AddStatusOrCategoryMessageFn = async ({
  message,
  connectionId,
}) => {
  const { payload, action } = message;
  const { color, name } = payload;
  const procedureInput = { color, name, connectionId };
  const result =
    action === Action.AddStatus
      ? await addStatus(procedureInput)
      : await addCategory(procedureInput);
  const data = JSON.stringify({
    message: Action.GetStatusAndCategory,
    payload: {
      ...(action === Action.AddStatus && { status: result }),
      ...(action === Action.AddCategory && { categories: result }),
    },
  });
  postToConnections({ everyone: true, message: data });
};
