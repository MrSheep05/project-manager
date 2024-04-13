import { Severity } from "../log/types";
import { println } from "../log";
import { addProjectMessage } from "./messages/addProject";
import { Action, Mesages, OnMessageFn } from "./types";
import {
  addStatusOrCategoryMessage,
  changeAccountStateMessage,
  getProjectsMessage,
  getStatusAndCategoryMessage,
  getUsersMessage,
  removeStatusOrCategoryMessage,
} from "./messages";

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
      case Action.RemoveStatus || Action.RemoveCategory: {
        await removeStatusOrCategoryMessage({
          connectionId,
          message: { action, payload },
        });
        break;
      }
      case Action.GetStatusAndCategory: {
        await getStatusAndCategoryMessage({ connectionId, ws });
        break;
      }
      case Action.ChangeAccountState: {
        await changeAccountStateMessage({
          connectionId,
          message: { action, payload },
        });
        break;
      }
      case Action.GetUsers: {
        await getUsersMessage({ ws, message: { action, payload } });
        break;
      }
      case Action.GetProjects: {
        await getProjectsMessage({ ws, message: { action, payload } });
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
