import { useCallback, useState } from 'react'
import update from 'immutability-helper'

import Block from '../blocks/Block'
import "./space.css"

const style = {
    width: 400,
}

const INITIAL_CODE = 'print($$fade$$)\n' +
    '  print("Par$$fade$$")\n' +
    'print("$$fade$$blems")'

const FADE_TOKEN = "$$fade$$";
const mapLine = (text, id) => {
    let parsedText = text;
    const fadedIndices = []
    while (parsedText.indexOf(FADE_TOKEN) >= 0) {
        const i = parsedText.indexOf(FADE_TOKEN);
        fadedIndices.push(i)
        parsedText = parsedText.replace(FADE_TOKEN, "");
    }
    const indentation = Math.floor(countSpaces(parsedText) / 2);
    return {id, text: parsedText, fadedIndices, indentation};
}
const countSpaces = (line) => {
    let i = 0;
    let count = 0;
    walkLine: while (i < line.length) {
        const c = line.charAt(i)
        switch (c) {
            case " ":
                count++;
                break;
            case "\t":
                count += 2;
                break;
            default:
                break walkLine;
        }
        i++;
    }
    return count;
}

const Space = () => {

    const [cards, setCards] = useState(INITIAL_CODE.split("\n").map(mapLine))
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
            setCards((prevCards) => {
                const c = update(prevCards, {
                    [dragIndex]: {
                        indentation: {
                            // $apply: (prevIndent) => Math.min(Math.max(0, prevIndent + indentationDiff), 10)
                            $set: Math.min(Math.max(0, indentationDiff), 10)
                        }
                    }
                });
                return c;
            })
        }
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
                fadedIndices={card.fadedIndices}
                indentation={card.indentation}
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
