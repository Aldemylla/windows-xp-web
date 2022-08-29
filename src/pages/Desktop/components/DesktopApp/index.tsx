import { useContext, MouseEvent } from "react";
import { DesktopContext } from "../../contexts/DesktopContext";

import { Rnd } from "react-rnd";

import explorerMinimize from "../../../../assets/images/program-icons/window-explorer/minimize.png";
import explorerMaximize from "../../../../assets/images/program-icons/window-explorer/maximize.png";
import explorerClose from "../../../../assets/images/program-icons/window-explorer/close.png";

import { DesktopAppType } from "../../types";

import "./style.scss";

type DesktopAppProps = {
  app: DesktopAppType;
};

export default function DesktopApp({ app }: DesktopAppProps) {
  const { openedDesktopApps, setOpenedDesktopApps } =
    useContext(DesktopContext);

  function closeApp(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();

    const newOpenedDesktopApps = openedDesktopApps.filter(
      (openedApp) => openedApp.appId !== app.appId
    );

    setOpenedDesktopApps([...newOpenedDesktopApps]);
  }

  return (
    <Rnd
      default={{
        x: 0,
        y: 0,
        width: 320,
        height: 300,
      }}
      minWidth='120'
      minHeight='31'
      bounds='parent'
      cancel='.no-drag'
      className='desktop__app'>
      <header>
        <div className='title__container'>
          <img src={app.icon} alt='' />
          <h1>{app.title}</h1>
        </div>
        <div className='window-handlers'>
          <button className='minimize no-drag'>
            <img src={explorerMinimize} alt='Minimize' />
          </button>
          <button className='maximize no-drag'>
            <img src={explorerMaximize} alt='Maximize' />
          </button>
          <button className='close no-drag' onClick={closeApp}>
            <img src={explorerClose} alt='Close' />
          </button>
        </div>
      </header>
      <main className='no-drag'>
        <section className='tools-bar'>
          <button className='tool'>Editar</button>
          <button className='tool'>Exibir</button>
          <button className='tool'>Editar</button>
        </section>
      </main>
    </Rnd>
  );
}
