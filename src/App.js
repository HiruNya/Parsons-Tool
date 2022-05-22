import './App.css';
import Space from "./components/Space";
import {useState} from "react";

function App() {
    const [blocks, setBlocks] = useState({
        123: {
            text: 'print("Hello")'
        },
        456: {
            text: 'print("Parsons")'
        },
        789: {
            text: 'print("Problems")'
        },
    });
    const [indices, setIndices] = useState([
        "123",
        "456",
        "789",
    ]);

    const moveBefore = (blockId, beforeId) => {
        setIndices(prevState => {
            console.log(blockId, prevState)
            const blockIdx = prevState.findIndex(id => id === blockId);
            prevState.splice(blockIdx, 1);
            const beforeIdx = prevState.findIndex(id => id === beforeId);
            console.log(beforeIdx)
            prevState.splice(beforeIdx, 0, blockId);
            return [...prevState]
        })
    }
    console.log(indices)

  return (
    <div className="App">
        <Space
            blocks={blocks}
            indices={indices}
            moveBefore={moveBefore}
        />
    </div>
  );
}

export default App;
