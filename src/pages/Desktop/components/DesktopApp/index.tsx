import { DesktopAppType } from "../../types";

type DesktopAppProps = {
  app: DesktopAppType;
};

export default function DesktopApp({ app }: DesktopAppProps) {
  return (
    <div>
      <p>
        {app.item}, {app.state}
      </p>
    </div>
  );
}
