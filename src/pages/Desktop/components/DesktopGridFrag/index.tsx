import { DragEvent, useContext, useEffect, useRef, useState } from "react";

import DesktopItem from "../DesktopItem";

import { DesktopItemType } from "../../types";
import {
  DesktopContext,
  DesktopContextType,
} from "../../contexts/DesktopContext";

type DesktopGridFragProps = {
  gridIndex: number;
};

export default function DesktopGridFrag({ gridIndex }: DesktopGridFragProps) {
  const {
    desktopItems,
    setDesktopItems,
    selectedDesktopItem,
    setSelectedDesktopItem,
  } = useContext(DesktopContext) as DesktopContextType;

  function allowDrop(ev: DragEvent<HTMLDivElement>) {
    ev.preventDefault();
  }

  const [objectDesktopItem, setObjectDesktopItem] = useState<DesktopItemType>();

  useEffect(() => {
    setObjectDesktopItem(desktopItems.find((item) => item.index === gridIndex));
  }, [desktopItems]);

  const dragItem = useRef<HTMLDivElement>(null);

  function drop(ev: DragEvent<HTMLDivElement>) {
    ev.preventDefault();

    if (!objectDesktopItem) {
      const data = ev.dataTransfer.getData("text") as "calculator" | "trash";

      const newDesktopItems = desktopItems.filter((item) => item.item !== data);

      setDesktopItems([
        ...newDesktopItems,
        {
          item: data,
          index: gridIndex,
        },
      ]);
    }

    ev.dataTransfer.clearData();
  }

  function selectItemHandler() {
    setSelectedDesktopItem(objectDesktopItem?.item || "");
  }

  return (
    <div
      id={`frag-${gridIndex}`}
      className='desktop-grid__frag'
      ref={dragItem}
      onDrop={drop}
      onDragOver={allowDrop}
      onClick={selectItemHandler}>
      {objectDesktopItem && (
        <DesktopItem
          itemName={objectDesktopItem.item}
          selected={selectedDesktopItem === objectDesktopItem.item}
        />
      )}
    </div>
  );
}
