import {
  useContext,
  MouseEvent,
  useRef,
  RefObject,
  useState,
  useLayoutEffect,
  useEffect,
} from "react";
import { DesktopContext } from "../../contexts/DesktopContext";

import { Rnd as Window } from "react-rnd";

import explorerMinimize from "../../../../assets/images/program-icons/window-explorer/minimize.png";
import explorerMaximize from "../../../../assets/images/program-icons/window-explorer/maximize.png";
import explorerClose from "../../../../assets/images/program-icons/window-explorer/close.png";

import { DesktopAppType } from "../../types";

import "./style.scss";

export default function DesktopApp({ app }: { app: DesktopAppType }) {
  const {
    screenSize,
    openedDesktopApps,
    setOpenedDesktopApps,
    focusedApp,
    setFocusedApp,
  } = useContext(DesktopContext);

  const defaultWindow = {
    x: 0,
    y: 0,
    width: 320,
    height: 300,
  };
  const windowMaxSize = {
    width: `${screenSize.width - 1}px`, // 1: Window right border
    height: `${screenSize.height - 31}px`, // 31: Taskbar height;
  };

  const windowRef = useRef() as RefObject<Window>;

  const [sizeBeforeMaximize, setSizeBeforeMaximize] = useState({
    width: `${defaultWindow.width}px`,
    height: `${defaultWindow.height}px`,
  });
  const [positionBeforeMaximize, setPositionBeforeMaximize] = useState({
    x: defaultWindow.x,
    y: defaultWindow.y,
  });
  const [windowTransitions, setWindowTransitions] = useState(false);

  useLayoutEffect(() => {
    updateWindowPosition("center");
  }, []);

  function updateWindowPosition(position: "initial" | "center" | "zero") {
    const windowElement = windowRef.current;

    if (!!windowElement) {
      if (position === "initial") {
        windowElement.updatePosition(positionBeforeMaximize);
      }

      if (position === "center") {
        const centerPosition = {
          x: Math.round(
            Math.max((screenSize.width - defaultWindow.width) / 2, 0)
          ),
          y: Math.round(
            Math.max((screenSize.height - defaultWindow.height) / 2, 0)
          ),
        };

        windowElement.updatePosition(centerPosition);
      }

      if (position === "zero") {
        const dragabbleElement = windowElement.draggable.state;
        const { x, y } = dragabbleElement;

        setPositionBeforeMaximize({ x, y });
        windowElement.updatePosition({
          x: 0,
          y: 0,
        });
      }
    }
  }

  function minimizeWindow() {
    const newOpenedDesktopApps = openedDesktopApps;
    const appIndex = newOpenedDesktopApps.indexOf(app);
    newOpenedDesktopApps[appIndex].minimized = true;

    setOpenedDesktopApps([...newOpenedDesktopApps]);

    setFocusedApp("");
  }

  function resizeWindow() {
    setWindowTransitions(true);
    const windowElement = windowRef.current;

    if (!!windowElement) {
      const resizableElement = windowElement.resizableElement.current;
      const currentWindowSize = {
        width: `${resizableElement?.offsetWidth}px`,
        height: `${resizableElement?.offsetHeight}px`,
      };

      if (JSON.stringify(currentWindowSize) !== JSON.stringify(windowMaxSize)) {
        setSizeBeforeMaximize(currentWindowSize);
        windowElement.updateSize(windowMaxSize);

        updateWindowPosition("zero");
      } else {
        windowElement.updateSize(sizeBeforeMaximize);

        updateWindowPosition("initial");
      }
    }
  }

  function closeWindow(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();

    const newOpenedDesktopApps = openedDesktopApps.filter(
      (openedApp) => openedApp.appId !== app.appId
    );
    setOpenedDesktopApps(newOpenedDesktopApps);
  }

  return (
    <Window
      ref={windowRef}
      default={defaultWindow}
      onResizeStart={() => setWindowTransitions(false)}
      onDragStart={() => setWindowTransitions(false)}
      minWidth='120'
      minHeight='31'
      bounds='parent'
      cancel='.no-drag'
      className={`desktop__app ${focusedApp === app.appId ? "focused" : ""} ${
        windowTransitions ? "transitions" : ""
      } ${app.minimized ? "minimized" : ""}`}
      onMouseDown={() => setFocusedApp(app.appId)}>
      <header>
        <div className='title__container'>
          <img src={app.icon} alt='' />
          <h1>{app.title}</h1>
        </div>
        <div className='window-handlers'>
          <button className='minimize no-drag' onClick={minimizeWindow}>
            <img src={explorerMinimize} alt='Minimize' />
          </button>
          <button className='maximize no-drag' onClick={resizeWindow}>
            <img src={explorerMaximize} alt='Maximize' />
          </button>
          <button className='close no-drag' onClick={closeWindow}>
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
    </Window>
  );
}
