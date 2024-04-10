import { CategoryOrStatusBody } from "../../queries/types";

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
