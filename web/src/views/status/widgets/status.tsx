import { CategoryOrStatusBody } from "../../../utils/types";

type StatusWidgetProps = {
  status: CategoryOrStatusBody;
  edit: (status: CategoryOrStatusBody) => void;
};

const StatusWidget = ({ edit, status }: StatusWidgetProps) => {};

export default StatusWidget;
