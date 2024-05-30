import { ProjectBody } from "../../queries/types";
import { getProjects } from "../database";
import { GetProjectsMessageFn } from "./types";

export const getProjectsMessage: GetProjectsMessageFn = async ({
  ws,
  message,
}) => {
  const { connectionId } = ws;
  const {
    action,
    payload: { offsetId },
  } = message;
  const result = await getProjects({ connectionId, offsetId });
  ws.send(
    JSON.stringify({
      message: action,
      payload: Array.isArray(result)
        ? result.map((project) => ({
            ...project,
            categories: JSON.parse(project.categories),
            status: JSON.parse(project.status),
          }))
        : [result as ProjectBody].map((project) => ({
            ...project,
            categories: JSON.parse(project.categories),
            status: JSON.parse(project.status),
          })),
    })
  );
};
