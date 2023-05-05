import * as React from "react";

interface BlockProps {
  padding?: number;
}

const Block: React.FC<React.PropsWithChildren<BlockProps>> = ({
  children,
  padding,
}) => (
  <div
    style={{
      background: "#fff",
      padding: typeof padding === "undefined" ? 25 : padding,
    }}
  >
    {children}
  </div>
);

export default Block;
