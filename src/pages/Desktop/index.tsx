import { useContext, useRef } from "react";

import SelectionBox from "./components/DesktopSelectionBox";
import DesktopGridFrag from "./components/DesktopGridFrag";
import DesktopApp from "./components/DesktopApp";
import DesktopTaskbar from "./components/DesktopTaskbar";

import DesktopContextProvider, {
  DesktopContext,
  DesktopContextType,
} from "./contexts/DesktopContext";
import useMouse from "./hooks/useMouse";

import "./style.scss";

function DesktopContainer() {
  const { gridFragsQuantity, openedDesktopApps, dispatchSelectIcons } =
    useContext(DesktopContext) as DesktopContextType;

  const ref = useRef(null);
  const mouse = useMouse(ref);

  function startSelection() {
    dispatchSelectIcons({
      type: "start_select",
      payload: { x: mouse.docX, y: mouse.docY },
    });
  }

  function endSelection() {
    dispatchSelectIcons({ type: "end_select" });
  }

  return (
    <main className='desktop'>
      <div
        className='desktop-grid'
        ref={ref}
        onMouseDown={startSelection}
        onMouseUp={endSelection}>
        <SelectionBox />
        {[...Array(gridFragsQuantity)].map((deskGridFrag, index) => (
          <DesktopGridFrag key={index} gridIndex={index} />
        ))}
        {openedDesktopApps.map((app, index) => (
          <DesktopApp key={index} app={app} />
        ))}
      </div>
      <DesktopTaskbar />
    </main>
  );
}

export default function Desktop() {
  return (
    <DesktopContextProvider>
      <DesktopContainer />
    </DesktopContextProvider>
  );
}
