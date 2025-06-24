import React from "react";
import { Footer } from "@excalidraw/excalidraw/index";
import { EncryptedIcon } from "./EncryptedIcon";
import { ExcalidrawPlusAppLink } from "./ExcalidrawPlusAppLink";
import { isExcalidrawPlusSignedUser } from "../app_constants";
import { DebugFooter, isVisualDebuggerEnabled } from "./DebugCanvas";
import RoomInfo from "./RoomEndTime";

export const AppFooter = React.memo(
  ({ onChange, portal }: { onChange: () => void; portal: { roomId?: string } }) => {
    return (
      <Footer>
        <div
          style={{
            display: "flex",
            gap: ".5rem",
            alignItems: "center",
          }}
        >
          <EncryptedIcon />
          <RoomInfo portal={portal} />
        </div>
      </Footer>
    );
  },
);
