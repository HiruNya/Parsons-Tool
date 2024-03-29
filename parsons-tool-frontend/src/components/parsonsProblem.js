import Space from './space/Space';
import React, { useCallback, useEffect, useState } from 'react';
import { DndContext, DragOverlay, MouseSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import update from 'immutability-helper';
import { defaultInnerProps, PresentationalBlock } from './blocks/Block';
import { useLogging } from '../loggers/logContext';

function ParsonsProblem({ problem, problemId }) {
  const { logBlockDrag, logInputSet, setState: setLoggerState } = useLogging();

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 5,
    },
  });

  const sensors = useSensors(mouseSensor);

  const [state, setState] = useState(() => ({
    initialProblem: problemId,
    problem: problem.blocks.map((block) => block.id),
    solution: [],
    blocks: Object.fromEntries(
      problem.blocks.map((block) => [block.id, { currentInputs: block.fadedIndices.map(() => ''), ...block }]),
    ),
  }));

  // Acts as a force refresh if the problem has changed, and the component needs to reset with new data
  useEffect(() => {
    setState({
      initialProblem: problemId,
      problem: problem.blocks.map((block) => block.id),
      solution: [],
      blocks: Object.fromEntries(
        problem.blocks.map((block) => [block.id, { currentInputs: block.fadedIndices.map(() => ''), ...block }]),
      ),
    });
  }, [problem, problemId]);

  const [activeId, setActiveId] = useState(null);
  const dragEnd = useCallback(
    ({ active, over, delta }) => {
      if (!active || !over) {
        return;
      }
      setActiveId(null);
      setDraggedGuidePosition(null);
      return setState((state) => {
        const [oldSpace, oldIndex] = getPos(state, active.id);
        let [newSpace, newIndex_] = getPos(state, over.id);
        let newIndex = newIndex_ < 0 ? state[newSpace].length : newIndex_;
        const oldIndentation = state.blocks[active.id].indentation;
        let indentation = oldIndentation;
        indentation = (indentation ? indentation : 0) + Math.floor(delta.x / 40);
        indentation = Math.min(Math.max(indentation, 0), 8);
        indentation = oldSpace === newSpace ? indentation : 0;
        newSpace = newSpace || (Object.keys(state).indexOf(over.id) >= 0 ? over.id : oldSpace);

        if (active.id === over.id && (oldSpace === 'problem' || oldIndentation - indentation === 0)) {
          return state;
        }

        let moveBlock;
        if (oldSpace === newSpace) {
          moveBlock = {
            [oldSpace]: {
              $set: arrayMove(state[oldSpace], oldIndex, newIndex),
            },
          };
        } else {
          moveBlock = {
            [newSpace]: {
              $splice: [[newIndex, 0, active.id]],
            },
            [oldSpace]: {
              $splice: [[oldIndex, 1]],
            },
          };
        }

        logBlockDrag({
          blockId: active.id,
          newSpace,
          newIndex,
          newIndentation: indentation,
        });

        return update(state, {
          ...moveBlock,
          blocks: {
            [active.id]: {
              indentation: {
                $set: indentation,
              },
            },
          },
        });
      });
    },
    [logBlockDrag],
  );
  const dragStart = useCallback(({ active }) => {
    setActiveId(active.id);
  }, []);
  const setInput = useCallback(
    (blockId, fadedIndex, newValue) =>
      setState((oldState) => {
        logInputSet({
          blockId,
          fadedIndex,
          newValue,
        });
        return update(oldState, {
          blocks: {
            [blockId]: {
              currentInputs: {
                [fadedIndex]: {
                  $set: newValue,
                },
              },
            },
          },
        });
      }),
    [logInputSet],
  );
  const [draggedGuidePosition, setDraggedGuidePosition] = useState(null);
  const dragMove = useCallback(
    ({ active, delta }) => {
      if (active.data.current.sortable.containerId === 'problem') {
        return setDraggedGuidePosition(null);
      }
      const dx = Math.floor(delta.x / 40);
      const posX = state.blocks[active.id].indentation + dx;
      setDraggedGuidePosition(Math.max(Math.min(posX, 8), 0));
    },
    [state],
  );
  useEffect(() => setLoggerState(state), [state, setLoggerState]);

  return (
    <div className="App flex w-full">
      <DndContext
        sensors={sensors}
        onDragEnd={dragEnd}
        onDragStart={dragStart}
        onDragMove={dragMove}
        onDragCancel={() => setActiveId(null)}
      >
        <Space
          name={'problem'}
          blocks={state.problem.map((val) => state.blocks[val])}
          setInput={setInput}
          height={problem.blocks.length}
        />
        <Space
          name={'solution'}
          blocks={state.solution.map((val) => state.blocks[val])}
          setInput={setInput}
          enableHorizontal={true}
          height={problem.blocks.length}
          draggedGuidePosition={draggedGuidePosition}
        />
        <DragOverlay dropAnimation={null}>
          {activeId ? (
            <div style={{ transform: `translateX(${state.blocks[activeId].indentation * 40}px)` }}>
              <PresentationalBlock
                innerProps={(i) =>
                  defaultInnerProps(state.blocks[activeId].currentInputs, i, (index, val) =>
                    setInput(activeId, index, val),
                  )
                }
                {...stripExtraObjectProperties(state.blocks[activeId])}
              />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

const getPos = (state, id) => {
  const spaces = ['problem', 'solution'];
  let index = -1;
  let s = 0;
  while (index < 0 && s < spaces.length) {
    index = state[spaces[s]].indexOf(id);
    s++;
  }
  return [spaces[s - 1], index];
};

const stripExtraObjectProperties = (obj) => {
  const newObject = { ...obj };
  delete newObject.currentInputs;
  delete newObject.correctIndentation;
  return newObject;
};

export default ParsonsProblem;
