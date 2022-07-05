import Space from "./space/Space";
import React, {useCallback, useState} from "react";
import {DndContext} from "@dnd-kit/core";
import {arrayMove} from "@dnd-kit/sortable";
import update from "immutability-helper";

function ParsonsProblem({problem}) {
    const [state, setState] = useState(() => ({
        problem: problem.blocks.map(block => block.id),
        blocks: Object.fromEntries(problem.blocks.map(block => [block.id, block])),
    }));
    const dragEnd = useCallback(({active, over, delta}) => {
        if (!active || !over) {
            return;
        }
        return setState((state) => {
            const oldIndex = state.problem.indexOf(active.id);
            const newIndex = state.problem.indexOf(over.id);
            let indentation = state.blocks[active.id].indentation;
            indentation = ((indentation) ? indentation : 0) + Math.floor(delta.x / 40);
            indentation = Math.min(Math.max(indentation, 0), 8);

            return {
                ...state,
                problem: arrayMove(state.problem, oldIndex, newIndex),
                blocks: update(state.blocks, {
                    [active.id]: {
                        indentation: {
                            $set: indentation,
                        }
                    }
                }),
            };
        });
    }, []);

    return (
        <div className="App">
            <DndContext onDragEnd={dragEnd}>
                <Space blocks={state.problem.map(val => state.blocks[val])}/>
            </DndContext>
        </div>
    );
}

export default ParsonsProblem;
