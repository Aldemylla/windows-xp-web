import { RefObject, useState, useEffect, useContext } from "react";
import { DesktopContext, DesktopContextType } from "../contexts/DesktopContext";

//TODO: Refactor this hook

export interface State {
  docX: number;
  docY: number;
  posX: number;
  posY: number;
  elX: number;
  elY: number;
  elH: number;
  elW: number;
}

const useMouse = (ref: RefObject<Element>): State => {
  const { dispatchSelectIcons } = useContext(
    DesktopContext
  ) as DesktopContextType;

  const [state, setState] = useState<State>({
    docX: 0,
    docY: 0,
    posX: 0,
    posY: 0,
    elX: 0,
    elY: 0,
    elH: 0,
    elW: 0,
  });

  useEffect(() => {
    const moveHandler = (event: MouseEvent) => {
      if (ref && ref.current) {
        const {
          left,
          top,
          width: elW,
          height: elH,
        } = ref.current.getBoundingClientRect();
        const posX = left + window.pageXOffset;
        const posY = top + window.pageYOffset;
        const elX = event.pageX - posX;
        const elY = event.pageY - posY;

        setState({
          docX: event.pageX,
          docY: event.pageY,
          posX,
          posY,
          elX,
          elY,
          elH,
          elW,
        });

        dispatchSelectIcons({
          type: "update_pos",
          payload: { x: event.pageX, y: event.pageY },
        });
      }
    };

    document.addEventListener("mousemove", moveHandler);

    return () => {
      document.addEventListener("mousemove", moveHandler);
    };
  }, [ref]);

  return state;
};

export default useMouse;
