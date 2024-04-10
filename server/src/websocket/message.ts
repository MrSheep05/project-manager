import { println } from "../log";
import { Severity } from "../log/types";
import { addProjectMessage } from "./messages/addProject";
import { addStatusOrCategoryMessage } from "./messages/addStatusOrCategory";
import { getCategoryOrStatusMessage } from "./messages/getCategoryAndStatus";
import { Action, Mesages, OnMessageFn } from "./types";

export const onMessage: OnMessageFn = async ({ event, ws }) => {
  const { action, payload } = JSON.parse(event.data) as Mesages;
  const { connectionId } = ws;
  if (!action || !payload) return;
  try {
    switch (action) {
      case Action.AddProject: {
        await addProjectMessage({ connectionId, message: { action, payload } });
        break;
      }
      case Action.AddStatus || Action.AddCategory: {
        await addStatusOrCategoryMessage({
          connectionId,
          message: { action, payload },
        });
        break;
      }
      case Action.GetCategoryAndStatus: {
        await getCategoryOrStatusMessage({ connectionId, ws });
        break;
      }
      default: {
        println(
          { severity: Severity.Warning },
          "No such matching action for",
          action
        );
      }
    }
  } catch (error) {
    println({ severity: Severity.Error }, error);
  }
};
