import { CategoryOrStatusBody } from "../../queries/types";
export { addProjectMessage } from "./addProject";
export { addStatusOrCategoryMessage } from "./addStatusOrCategory";
export { removeStatusOrCategoryMessage } from "./removeStatusOrCategory";
export { getStatusAndCategoryMessage } from "./getStatusAndCategory";
export { changeAccountStateMessage } from "./changeAccountState";
export { getUsersMessage } from "./getUsers";
export { getProjectsMessage } from "./getProjects";
export const categoryOrStatusMap = (
  data: CategoryOrStatusBody[]
): ParsedCategoryOrStatus[] =>
  data.map((x) => {
    return { ...x, color: x.color.toString(16) };
  });

type ParsedCategoryOrStatus = {
  color: string;
  id: string;
  name: string;
  visible: boolean;
};
