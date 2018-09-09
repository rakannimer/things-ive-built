import * as React from "react";

export type SeparatorProps = {
  vertical?: boolean;
  horizontal?: boolean;
  space?: number;
};

export const Separator = ({
  vertical,
  horizontal,
  space = 1
}: SeparatorProps) => (
  <div
    style={{
      marginTop: vertical ? space : 0,
      marginBottom: vertical ? space : 0,
      marginLeft: horizontal ? space : 0,
      marginRight: horizontal ? space : 0
    }}
  />
);
