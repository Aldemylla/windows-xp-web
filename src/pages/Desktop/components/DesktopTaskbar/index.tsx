import { useContext, useEffect, useState } from "react";

import logoWindows from "../../../../assets/images/w-logo.png";
import { DesktopContext } from "../../contexts/DesktopContext";
import { DesktopAppType } from "../../types";

import "./style.scss";

export default function DesktopTaskbar() {
  const { openedDesktopApps, setOpenedDesktopApps, focusedApp, setFocusedApp } =
    useContext(DesktopContext);
  const [currentyTime, setCurrentyTime] = useState(getCorrectlyTime());

  function getCorrectlyTime() {
    const datetime = new Date().toLocaleString();
    const time = datetime.split(" ")[1];
    const timeWithoutSeconds = time.replace(/(:[0-9]+$)/, "");
    return timeWithoutSeconds;
  }

  useEffect(() => {
    setInterval(() => {
      setCurrentyTime(getCorrectlyTime());
    }, 1000);
  }, []);

  function focusApp(app: DesktopAppType) {
    setFocusedApp(app.appId);

    if (app.minimized) {
      const newOpenedDesktopApps = openedDesktopApps;
      const appIndex = newOpenedDesktopApps.indexOf(app);
      newOpenedDesktopApps[appIndex].minimized = false;

      setOpenedDesktopApps([...newOpenedDesktopApps]);
    }
  }

  return (
    <div className='taskbar'>
      <section className='taskbar__apps'>
        <button className='taskbar__apps__start'>
          <img src={logoWindows} alt='Logo do Windows XP' />
          <span>Iniciar</span>
        </button>
        {openedDesktopApps.map((app, index) => (
          <button
            key={index}
            className={`taskbar__apps__app ${
              focusedApp === app.appId ? "focused" : ""
            }`}
            title={app.title}
            onMouseDown={() => focusApp(app)}>
            <img src={app.icon} alt={app.title} />
            {app.title}
          </button>
        ))}
      </section>
      <section className='taskbar__tools'>
        <button></button>
        <button></button>
        <button></button>
        <button></button>
        <p>{currentyTime}</p>
      </section>
    </div>
  );
}
