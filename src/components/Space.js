import { useCallback, useState } from 'react'
import update from 'immutability-helper'

import Block from './Block'
import "./space.css"
import {hover} from "@testing-library/user-event/dist/hover";

const style = {
    width: 400,
}

const INITIAL_CODE = 'print("Hello")\n' +
    'print("Parsons")\n' +
    'print("Problems")'

const Space = () => {

    const [cards, setCards] = useState(INITIAL_CODE.split("\n").map((text, id) => ({id, text})))
    const moveCard = useCallback((dragIndex, hoverIndex) => {
        console.log("Moved", cards[dragIndex].id, "to", cards[hoverIndex].id);
        setCards((prevCards) =>
            update(prevCards, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, prevCards[dragIndex]],
                ],
            })
        )
    }, [])
    console.log(cards.map(({id}) => id))
    const matches = (cards.find(({id}, i) => id !== i) === undefined)? "matches": "not-matches";
    const renderCard = useCallback((card, index) => {
        return (
            <Block
                key={card.id}
                index={index}
                id={card.id}
                text={card.text}
                moveCard={moveCard}
            />
        )
    }, [])
    return (
        <>
            <div className={"parsons-space " + matches} style={style}>{cards.map((card, i) => renderCard(card, i))}</div>
        </>
    )
}

export default Space;
