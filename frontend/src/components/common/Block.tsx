import * as React from "react";

interface BlockProps {
  padding?: number;
  style?: { [key: string]: string | number };
}

const Block: React.FC<React.PropsWithChildren<BlockProps>> = ({
  children,
  padding,
  style,
}) => {
  return (
    <div
      style={{
        background: "#fff",
        padding: typeof padding === "undefined" ? 25 : padding,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
export default Block;
