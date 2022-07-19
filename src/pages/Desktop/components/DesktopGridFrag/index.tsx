import {
  Dispatch,
  DragEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

import DesktopItem from "../DesktopItem";

type DesktopItem = {
  item: "calculator" | "trash";
  index: number;
};

type DesktopGridFragProps = {
  gridIndex: number;
  lastGridIndex: number;
  desktopItems: DesktopItem[];
  setDesktopItems: Dispatch<SetStateAction<DesktopItem[]>>;
};

export default function DesktopGridFrag({
  gridIndex,
  lastGridIndex,
  desktopItems,
  setDesktopItems,
}: DesktopGridFragProps) {
  function allowDrop(ev: DragEvent<HTMLDivElement>) {
    ev.preventDefault();
  }

  const [objectDesktopItem, setObjectDesktopItem] = useState<DesktopItem>();

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

  return (
    <div
      className="desktop-grid__frag"
      ref={dragItem}
      onDrop={drop}
      onDragOver={allowDrop}
      id={`frag-${gridIndex}`}
    >
      {objectDesktopItem && <DesktopItem itemType={objectDesktopItem.item} />}
    </div>
  );
}
