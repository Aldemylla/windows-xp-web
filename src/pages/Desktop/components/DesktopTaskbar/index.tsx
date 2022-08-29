import { useContext, useEffect, useState } from "react";

import logoWindows from "../../../../assets/images/w-logo.png";
import { DesktopContext } from "../../contexts/DesktopContext";

import "./style.scss";

export default function DesktopTaskbar() {
  const { openedDesktopApps, focusedApp, setFocusedApp } =
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

  return (
    <div className='taskbar'>
      <section className='taskbar__apps'>
        <button className='taskbar__apps__start'>
          <img src={logoWindows} alt='Logo do Windows XP' />
          <span>Iniciar</span>
        </button>
        {openedDesktopApps.map((openedApp, index) => (
          <button
            key={index}
            className={`taskbar__apps__app ${
              focusedApp === openedApp.appId ? "focused" : ""
            }`}
            title={openedApp.title}
            onMouseDown={() => setFocusedApp(openedApp.appId)}>
            <img src={openedApp.icon} alt={openedApp.title} />
            {openedApp.title}
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
