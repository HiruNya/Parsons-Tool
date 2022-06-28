import { useCallback} from 'react'

import Block from '../blocks/Block'
import "./space.css"

const style = {
    width: 400,
}

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
            <div className={"parsons-space " + matches} style={style}>{blocks.map(renderCard)}</div>
        </>
    )
}

export default Space;
