import React, {useCallback} from 'react'

import Block from '../blocks/Block'
import {SortableContext} from "@dnd-kit/sortable";
import {useDroppable} from "@dnd-kit/core";

const Space = ({ name, blocks, moveCard, matches }) => {
    const {
        setNodeRef,
    } = useDroppable({
        id: name,
    });
    const renderCard = useCallback((card, index) => {
        return (
            <Block
                key={card.id}
                index={index}
                id={card.id}
                text={card.text}
                // moveCard={moveCard}
                fadedIndices={card.fadedIndices}
                indentation={card.indentation}
            />
        )
    }, [moveCard])
    return (
        <div style={{minHeight: "150px", minWidth: "150px", border: "solid red"}} ref={setNodeRef}>
            <SortableContext items={blocks} id={name}>
                {blocks.map(renderCard)}
            </SortableContext>
        </div>
    )
}

export default Space;
