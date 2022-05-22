import "./block.css"

export default ({
    text,
    id,
    moveBefore,
}) => <div
        className={"parsons-block"}
        draggable={true}
        onDrag={e => {
            e.target.classList.add('drag')
        }}
        onDragEnd={ e =>
            e.target.classList.remove('drag')
        }
        onDragOver={e => {
            e.preventDefault()
            // console.log("drag-over", e.dataTransfer)
        }}
        onDragEnter={e => {
            e.target.classList.add('drag-over')
        }}
        onDragExit={e => {
            e.target.classList.remove('drag-over')
        }}
        onDragStart={e => {
            e.dataTransfer.setData("id", id);
            console.log("start", e.dataTransfer.getData("id"))
        }}
        onDrop={e => {
            e.preventDefault();
            e.target.classList.remove('drag-over')
            const blockId = e.dataTransfer.getData("id");
            console.log("drop", blockId)
            moveBefore(blockId, id)
        }}
    >
        { text }
    </div>
