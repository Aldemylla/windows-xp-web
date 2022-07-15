import iconCalculator from "../../assets/images/program-icons/windows-calculator.jpg";
import iconEmptyTrash from "../../assets/images/program-icons/empty-trash.png";

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
    <div>
      {shortcut ? (
        <div>
          <img src={item.icon} />
          <img src='' />
        </div>
      ) : (
        <img src={item.icon} />
      )}

      <p>{item.title}</p>
    </div>
  );
}
