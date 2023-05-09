import { loadQuery } from "react-relay";
import { RelayEnvironment } from "RelayEnvironment";
import { dashboardContainerQuery } from "./DashboardContainer";

const loader = async () => {
  return loadQuery(RelayEnvironment, dashboardContainerQuery, {});
};

export default loader;
