import { useContext } from "react";
import {
  DesktopContext,
  DesktopContextType,
} from "../../contexts/DesktopContext";

export default function SelectionBox() {
  const { selectIcons } = useContext(DesktopContext) as DesktopContextType;

  const { startPos, currentPos } = selectIcons;

  if (startPos && currentPos) {
    const coordX = Math.min(startPos.x, currentPos.x);
    const coordY = Math.min(startPos.y, currentPos.y);
    const width = Math.abs(startPos.x - currentPos.x);
    const height = Math.abs(startPos.y - currentPos.y);

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
