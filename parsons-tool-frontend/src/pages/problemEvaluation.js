import Space from "../components/space/Space";
import React from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

function ProblemEvaluation() {
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <Space />
      </DndProvider>
    </div>
  );
}

export default ProblemEvaluation;
