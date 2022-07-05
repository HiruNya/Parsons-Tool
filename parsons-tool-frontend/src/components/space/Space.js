import React, { useCallback} from 'react'

import Block from '../blocks/Block'
import {SortableContext} from "@dnd-kit/sortable";

const Space = ({ blocks, moveCard, matches }) => {

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
        <SortableContext items={blocks}>
            {blocks.map(renderCard)}
        </SortableContext>
    )
}

export default Space;
