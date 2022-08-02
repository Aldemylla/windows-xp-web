import { useContext } from "react";
import DesktopApp from "./components/DesktopApp";
import DesktopGridFrag from "./components/DesktopGridFrag";
import DesktopTaskbar from "./components/DesktopTaskbar";
import DesktopContextProvider, {
  DesktopContext,
  DesktopContextType,
} from "./contexts/DesktopContext";

import "./style.scss";

function DesktopContainer() {
  const { gridFragsQuantity, openedDesktopApps } = useContext(
    DesktopContext
  ) as DesktopContextType;

  return (
    <main className='desktop'>
      <div className='desktop-grid'>
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
