import iconCalculator from "../../assets/images/program-icons/windows-calculator.jpg";
import iconEmptyTrash from "../../assets/images/program-icons/empty-trash.png";
import iconShortcut from "../../assets/images/program-icons/shortcut.ico";

import "./style.scss";

type DesktopItemProps = {
  itemType: "calculator" | "trash";
  shortcut?: boolean;
};

export default function DesktopItem({ itemType, shortcut }: DesktopItemProps) {
  const itemTypes = {
    calculator: {
      icon: iconCalculator,
      title: "Calculadora",
    },
    trash: {
      icon: iconEmptyTrash,
      title: "Lixeira",
    },
  };

  const item = itemTypes[itemType];

  return (
    <div className='desktop-item'>
      {shortcut ? (
        <div className='desktop-item--shortcut'>
          <img src={item.icon} />
          <img src={iconShortcut} className='shortcut-icon' />
        </div>
      ) : (
        <img src={item.icon} />
      )}

      <p>{item.title}</p>
    </div>
  );
}
