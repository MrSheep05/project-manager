import { println } from "../../log";
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
        status: statusResult,
        categories: categoriesResult,
      },
    });
    ws.send(data);
  };
