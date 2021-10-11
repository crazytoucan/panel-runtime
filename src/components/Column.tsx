import { css, cx } from "@emotion/css";
import React from "react";
import { useMainSelector } from "../useSelector";
import { Group } from "./Group";

export function Column({ columnId, className }: { columnId: string; className: string }) {
  const column = useMainSelector((state) => state.columns.find((c) => c.columnId === columnId));
  if (column == null) {
    return null;
  }

  return (
    <div
      className={cx(
        css`
          width: 280px;
          display: flex;
          flex-direction: column;
        `,
        className,
      )}
    >
      {column.groupIds.map((groupId) => (
        <Group key={groupId} groupId={groupId} />
      ))}
    </div>
  );
}
