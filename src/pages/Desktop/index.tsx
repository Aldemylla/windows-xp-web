import { useEffect, useState } from "react";
import DesktopGridFrag from "./components/DesktopGridFrag";
import DesktopTaskbar from "./components/DesktopTaskbar";

import "./style.scss";

type DesktopItemsList = {
  item: "calculator" | "trash";
  index: number;
}[];

function Desktop() {
  const [screenSize, setScreeSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const setDimension = () => {
    setScreeSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", setDimension);

    return () => {
      window.removeEventListener("resize", setDimension);
    };
  }, [screenSize]);

  const gridFragsQuantity =
    Math.floor(screenSize.width / 100) *
    Math.floor((screenSize.height - 31) / 100);

  const [desktopItems, setDesktopItems] = useState<DesktopItemsList>([
    {
      item: "calculator",
      index: 0,
    },
    {
      item: "trash",
      index: gridFragsQuantity - 1,
    },
  ]);

  return (
    <div className="desktop">
      <div className="desktop-grid">
        {[...Array(gridFragsQuantity)].map((deskGridFrag, index) => (
          <DesktopGridFrag
            key={index}
            gridIndex={index}
            lastGridIndex={gridFragsQuantity - 1}
            desktopItems={desktopItems}
            setDesktopItems={setDesktopItems}
          />
        ))}
      </div>
      <DesktopTaskbar />
    </div>
  );
}

export default Desktop;
