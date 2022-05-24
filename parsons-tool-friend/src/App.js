import './App.css';
import Space from "./components/Space";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";

function App() {
  return (
    <div className="App">
        <DndProvider backend={HTML5Backend}>
            <Space
            />
        </DndProvider>
    </div>
  );
}

export default App;
