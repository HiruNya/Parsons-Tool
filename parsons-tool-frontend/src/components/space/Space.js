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
        <div style={{minHeight: "150px", minWidth: "150px", border: "solid red"}} ref={setNodeRef}>
            <SortableContext items={blocks} id={name}>
                {blocks.map(renderCard)}
            </SortableContext>
        </div>
    )
}

export default Space;
