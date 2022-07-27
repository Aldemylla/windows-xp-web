import { useContext } from "react";
import DesktopGridFrag from "./components/DesktopGridFrag";
import DesktopTaskbar from "./components/DesktopTaskbar";
import DesktopContextProvider, {
  DesktopContext,
  DesktopContextType,
} from "./contexts/DesktopContext";

import "./style.scss";

function DesktopContainer() {
  const { gridFragsQuantity } = useContext(
    DesktopContext
  ) as DesktopContextType;

  return (
    <div className='desktop'>
      <div className='desktop-grid'>
        {[...Array(gridFragsQuantity)].map((deskGridFrag, index) => (
          <DesktopGridFrag key={index} gridIndex={index} />
        ))}
      </div>
      <DesktopTaskbar />
    </div>
  );
}

export default function Desktop() {
  return (
    <DesktopContextProvider>
      <DesktopContainer />
    </DesktopContextProvider>
  );
}
