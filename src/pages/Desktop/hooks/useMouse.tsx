import { RefObject, useState, useEffect, useContext, useCallback } from "react";
import { DesktopContext, DesktopContextType } from "../contexts/DesktopContext";

export interface MouseCoords {
  x: number;
  y: number;
}

const useMouse = (ref: RefObject<Element>): MouseCoords => {
  const { dispatchDesktopReducer } = useContext(
    DesktopContext
  ) as DesktopContextType;

  const [mouseCoords, setMouseCoords] = useState<MouseCoords>({
    x: 0,
    y: 0,
  });

  let selecting = false;

  const handleMouseDown = () => {
    selecting = true;
  };

  const handleMouseUp = () => {
    selecting = false;
  };

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (ref) {
        setMouseCoords({
          x: event.pageX,
          y: event.pageY,
        });

        if (selecting) {
          dispatchDesktopReducer({
            type: "update_pos",
            payload: { x: event.pageX, y: event.pageY },
          });
        }
      }
      return;
    },
    [ref]
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("dragend", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.addEventListener("mousedown", handleMouseDown);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("dragend", handleMouseUp);
    };
  }, []);

  return mouseCoords;
};

export default useMouse;
