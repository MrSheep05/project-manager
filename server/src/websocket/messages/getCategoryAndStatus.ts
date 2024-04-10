import { categoryOrStatusMap } from ".";
import { println } from "../../log";
import { getCategories, getStatus } from "../database";
import { Action } from "../types";
import { GetCategoryOrStatusMessageFn } from "./types";

export const getCategoryOrStatusMessage: GetCategoryOrStatusMessageFn = async ({
  ws,
  connectionId,
}) => {
  const categoriesResult = await getCategories({ connectionId });
  const statusResult = await getStatus({ connectionId });

  const data = JSON.stringify({
    action: Action.GetCategoryAndStatus,
    payload: {
      status: categoryOrStatusMap(statusResult),
      categories: categoryOrStatusMap(categoriesResult),
    },
  });
  ws.send(data);
};
