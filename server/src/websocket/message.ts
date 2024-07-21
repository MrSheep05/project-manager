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
import { updateProjectMessage } from "./messages/updateProject";

export const onMessage: OnMessageFn = async ({ data, ws }) => {
  try {
    const message = JSON.parse(data.toString()) as Mesages;
    const { connectionId } = ws;
    if (!message.action || !message.payload) return;
    switch (message.action) {
      case Action.AddProject: {
        println({ severity: Severity.Info }, "ADDPROJECT", message.payload);

        await addProjectMessage({ connectionId, message });
        break;
      }
      case Action.AddStatus: {
        await addStatusOrCategoryMessage({
          connectionId,
          message,
        });
        break;
      }
      case Action.AddCategory: {
        await addStatusOrCategoryMessage({
          connectionId,
          message,
        });
        break;
      }
      case Action.RemoveCategory: {
        await removeStatusOrCategoryMessage({
          connectionId,
          message,
        });
        break;
      }
      case Action.RemoveStatus: {
        await removeStatusOrCategoryMessage({
          connectionId,
          message,
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
          message,
        });
        break;
      }
      case Action.GetUsers: {
        await getUsersMessage({ ws, message });
        break;
      }
      case Action.GetProjects: {
        await getProjectsMessage({ ws, message });
        break;
      }
      case Action.UpdateProject: {
        await updateProjectMessage({ connectionId, message });
        break;
      }
      case Action.GetConnectionId: {
        ws.send(
          JSON.stringify({
            message: Action.GetConnectionId,
            payload: { connectionId: ws.connectionId },
          })
        );
        break;
      }
      default: {
        println(
          { severity: Severity.Warning },
          "No such matching action for",
          message
        );
      }
    }
  } catch (error) {
    println({ severity: Severity.Error }, error);
  }
};
