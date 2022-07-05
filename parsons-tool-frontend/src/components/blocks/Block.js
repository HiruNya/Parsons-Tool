import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";



const Block = ({ id, text, index, moveCard, fadedIndices, indentation }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({id})

    if (transform) {
        transform.x = Math.floor(transform.x / 40) * 40;
    }

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        paddingLeft: (indentation)? ((4 + (indentation * 40)) + "px"): undefined,
    };

    if (indentation) {
        style.paddingLeft = (4 + (indentation * 40)) + "px";
    }

    return (
        <div className="flex py-2 px-4 mb-2 border-2 border-stone-400 border-dashed justify-start cursor-move bg-white" ref={setNodeRef} style={style} {...attributes} {...listeners}>
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
