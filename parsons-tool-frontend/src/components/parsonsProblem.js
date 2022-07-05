import Space from "./space/Space";
import React, {useCallback, useState} from "react";
import {DndContext} from "@dnd-kit/core";
import {arrayMove} from "@dnd-kit/sortable";
import update from "immutability-helper";

function ParsonsProblem({problem}) {
    const [state, setState] = useState(() => ({
        problem: problem.blocks.map(block => block.id),
        solution: [],
        blocks: Object.fromEntries(problem.blocks.map(block => [block.id, block])),
    }));
    const dragEnd = useCallback(({active, over, delta}) => {
        if (!active || !over) {
            return;
        }
        return setState((state) => {
            const [oldSpace, oldIndex] = getPos(state, active.id);
            let [newSpace, newIndex] = getPos(state, over.id);
            let indentation = state.blocks[active.id].indentation;
            indentation = ((indentation) ? indentation : 0) + Math.floor(delta.x / 40);
            indentation = Math.min(Math.max(indentation, 0), 8);
            newSpace = newSpace || ((Object.keys(state).indexOf(over.id) >= 0)? over.id: oldSpace);

            let moveBlock;
            if (oldSpace === newSpace) {
                moveBlock = {
                    [oldSpace]: {
                        $set: arrayMove(state[oldSpace], oldIndex, newIndex),
                    }
                }
            } else {
                moveBlock = {
                    [newSpace]: {
                        $splice: [
                            [Math.max(newIndex, 0), 0, active.id]
                        ]
                    },
                    [oldSpace]: {
                        $splice: [
                            [oldIndex, 1]
                        ]
                    },
                }
            }

            return update(state, {
                ...moveBlock,
                blocks: {
                    [active.id]: {
                        indentation: {
                            $set: indentation,
                        }
                    }
                },
            });
        });
    }, []);

    return (
        <div className="App" style={{display: "flex"}}>
            <DndContext onDragEnd={dragEnd}>
                <Space name={"problem"} blocks={state.problem.map(val => state.blocks[val])}/>
                <Space name={"solution"} blocks={state.solution.map(val => state.blocks[val])}/>
            </DndContext>
        </div>
    );
}

const getPos = (state, id) => {
    const spaces = ["problem", "solution"];
    let index = -1;
    let s = 0;
    while (index < 0 && s < spaces.length) {
        index = state[spaces[s]].indexOf(id);
        s++;
    }
    return [spaces[s-1], index]
}

export default ParsonsProblem;
