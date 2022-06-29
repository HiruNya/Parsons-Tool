import Space from "./space/Space";
import React, {useCallback, useState} from "react";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";
import update from "immutability-helper";

function ParsonsProblem({problem}) {
    const [cards, setCards] = useState(() => problem.blocks)
    const moveCard = useCallback((dragIndex, hoverIndex, indentationDiff) => {
        if (hoverIndex) {
            console.log("Moved", cards[dragIndex].id, "to", cards[hoverIndex].id, "+", indentationDiff);
            setCards((prevCards) => {
                const movedCard = prevCards[dragIndex];
                movedCard.indentation = Math.max(0, movedCard.indentation + indentationDiff);
                return update(prevCards, {
                    $splice: [
                        [dragIndex, 1],
                        [hoverIndex, 0, movedCard],
                    ],
                });
            })
        } else {
            setCards((prevCards) =>
                update(prevCards, {
                    [dragIndex]: {
                        indentation: {
                            // $apply: (prevIndent) => Math.min(Math.max(0, prevIndent + indentationDiff), 10)
                            $set: Math.min(Math.max(0, indentationDiff), 10)
                        }
                    }
                }))
        }
    }, [cards])
    const matches = (cards.find(({id}, i) => id !== problem.solution[i]) === undefined) ? true : false;

    return (
        <div className="App">
            <DndProvider backend={HTML5Backend}>
                <Space blocks={cards} moveCard={moveCard} matches={matches}/>
            </DndProvider>
        </div>
    );
}

export default ParsonsProblem;
