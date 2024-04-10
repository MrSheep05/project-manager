import { categoryOrStatusMap } from ".";
import { postToConnections } from "..";
import { addCategory, addStatus } from "../database";
import { Action } from "../types";
import { AddStatusOrCategoryMessageFn } from "./types";

export const addStatusOrCategoryMessage: AddStatusOrCategoryMessageFn = async ({
  message,
  connectionId,
}) => {
  const { payload, action } = message;
  const { color, name } = payload;
  const decColor = parseInt(color.replace("#", ""), 16);
  const procedureInput = { color: decColor, name, connectionId };
  const result =
    action === Action.AddStatus
      ? await addStatus(procedureInput)
      : await addCategory(procedureInput);
  const finalResult = categoryOrStatusMap([result]);
  const data = JSON.stringify({
    message: Action.GetCategoryAndStatus,
    payload: {
      ...(action === Action.AddStatus && { status: finalResult }),
      ...(action === Action.AddCategory && { categories: finalResult }),
    },
  });
  postToConnections({ everyone: true, message: data });
};
