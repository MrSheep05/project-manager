import { categoryOrStatusMap } from ".";
import { getCategories, getStatus } from "../database";
import { Action } from "../types";
import { GetStatusAndCategoryMessageFn } from "./types";

export const getStatusAndCategoryMessage: GetStatusAndCategoryMessageFn =
  async ({ ws, connectionId }) => {
    const categoriesResult = await getCategories({ connectionId });
    const statusResult = await getStatus({ connectionId });

    const data = JSON.stringify({
      message: Action.GetStatusAndCategory,
      payload: {
        status: categoryOrStatusMap(statusResult),
        categories: categoryOrStatusMap(categoriesResult),
      },
    });
    ws.send(data);
  };
