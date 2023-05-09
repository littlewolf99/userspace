import { loadQuery } from "react-relay";
import { RelayEnvironment } from "RelayEnvironment";
import { sidebarQuery } from "./Sidebar";

const loader = async () => {
  return loadQuery(RelayEnvironment, sidebarQuery, {});
};

export default loader;
