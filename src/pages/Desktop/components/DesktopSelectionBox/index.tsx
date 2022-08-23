import { useContext } from "react";
import {
  DesktopContext,
  DesktopContextType,
} from "../../contexts/DesktopContext";

export default function SelectionBox() {
  const { desktopReducer } = useContext(DesktopContext) as DesktopContextType;

  const { startSelectPos, currentSelectPos } = desktopReducer;

  if (startSelectPos && currentSelectPos) {
    const coordX = Math.min(startSelectPos.x, currentSelectPos.x);
    const coordY = Math.min(startSelectPos.y, currentSelectPos.y);
    const width = Math.abs(startSelectPos.x - currentSelectPos.x);
    const height = Math.abs(startSelectPos.y - currentSelectPos.y);

    return (
      <div
        style={{
          transform: `translate(${coordX}px,${coordY}px)`,
          width: width,
          height: height,
          position: "absolute",
          border: `2px dotted gray`,
        }}
      />
    );
  }
  return null;
}
