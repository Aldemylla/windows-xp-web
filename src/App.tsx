import DesktopItem from "./components/DesktopItem/indes";
import Taskbar from "./components/Taskbar";

function App() {
  return (
    <div className='App'>
      <DesktopItem itemType='calculator' />
      <Taskbar />
    </div>
  );
}

export default App;
