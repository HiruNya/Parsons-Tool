import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import "./block.css"


const style = {
    border: '1px dashed gray',
    padding: '0.5rem 1rem',
    marginBottom: '.5rem',
    backgroundColor: 'white',
    cursor: 'move',
    display: 'flex',
    justifyContent: 'left',
}

const Block = ({ id, text, index, moveCard, fadedIndices, indentation }) => {
    const ref = useRef(null)
    // https://react-dnd.github.io/react-dnd/examples/sortable/simple
    const [{ handlerId }, drop] = useDrop({
        accept: "BLOCK",
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index
            console.log(monitor.getDifferenceFromInitialOffset().x)
            const indentDiff = Math.floor(monitor.getDifferenceFromInitialOffset().x / 20);
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                if (indentDiff !== 0) {
                    moveCard(dragIndex, undefined, indentDiff);
                }
                return
            }
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            // Determine mouse position
            const clientOffset = monitor.getClientOffset()
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if ((dragIndex < hoverIndex && hoverClientY < hoverMiddleY)
                || (dragIndex > hoverIndex && hoverClientY > hoverMiddleY)) {
                return
            }
            // Time to actually perform the action
            moveCard(dragIndex, hoverIndex, indentDiff)
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex
        },
    })
    const [{ isDragging }, drag] = useDrag({
        type: "BLOCK",
        item: () => {
            return { id, index }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })
    const marginLeft = (indentation * 20) + "px"
    drag(drop(ref))
    return (
        <div ref={ref} style={{ ...style, marginLeft }} data-handler-id={handlerId}>
            {toFadedChildren(text, fadedIndices)}
        </div>
    )
}

const toFadedChildren = (text, fadedIndices) => {
    // expect the faded indices are in-order and properly merged if needed
    const spans = [];
    let lastIndex = 0;
    for (let i = 0; i < fadedIndices.length; i++) {
        const f = fadedIndices[i];
        spans.push(text.slice(lastIndex, f));
        spans.push(null);
        lastIndex = f;
    }
    spans.push(text.slice(lastIndex, text.length));
    return spans.map(span => (span && <span>{span}</span>) || <input type="text" style={{width: "10ch"}} />);
}

export default Block;
