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
import { webSocket } from "../configs/websocket";

export const onMessage: OnMessageFn = async ({ data, ws }) => {
  try {
    const { action, payload } = JSON.parse(data.toString()) as Mesages;
    const { connectionId } = ws;
    if (!action || !payload) return;
    switch (action) {
      case Action.AddProject: {
        await addProjectMessage({ connectionId, message: { action, payload } });
        break;
      }
      case Action.AddStatus: {
        await addStatusOrCategoryMessage({
          connectionId,
          message: { action, payload },
        });
        break;
      }
      case Action.AddCategory: {
        await addStatusOrCategoryMessage({
          connectionId,
          message: { action, payload },
        });
        break;
      }
      case Action.RemoveCategory: {
        await removeStatusOrCategoryMessage({
          connectionId,
          message: { action, payload },
        });
        break;
      }
      case Action.RemoveStatus: {
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
