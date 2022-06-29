import { useCallback} from 'react'

import Block from '../blocks/Block'

const Space = ({ blocks, moveCard, matches }) => {

    const renderCard = useCallback((card, index) => {
        return (
            <Block
                key={card.id}
                index={index}
                id={card.id}
                text={card.text}
                moveCard={moveCard}
                fadedIndices={card.fadedIndices}
                indentation={card.indentation}
            />
        )
    }, [moveCard])
    return (
        <>
            <div className={`w-96 border-solid border-2 ${matches ? "border-green-600" : "border-red-600"}`}>{blocks.map(renderCard)}</div>
        </>
    )
}

export default Space;
