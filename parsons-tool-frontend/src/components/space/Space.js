import React, {useCallback} from 'react'

import Block from '../blocks/Block'
import {SortableContext} from "@dnd-kit/sortable";
import {useDroppable} from "@dnd-kit/core";

const Space = ({ name, blocks, matches }) => {
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
                fadedIndices={card.fadedIndices}
                indentation={card.indentation}
            />
        )
    }, [])
    return (
        <div className={`p-2 ml-2 mr-2 w-96 h-80 border-solid rounded-lg border-2 ${matches ? "border-green-600" : "border-red-600"}`} ref={setNodeRef}>
            <SortableContext items={blocks} id={name}>
                {blocks.map(renderCard)}
            </SortableContext>
        </div>
    )
}

export default Space;
