import { useEffect, useState } from "react";

import logoWindows from "../../../../assets/images/w-logo.png";

import "./style.scss";

export default function DesktopTaskbar() {
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
      <section className='taskbar__programs'>
        <button className='taskbar__programs__start'>
          <img src={logoWindows} alt='Logo do Windows XP' />
          <span>Iniciar</span>
        </button>
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
