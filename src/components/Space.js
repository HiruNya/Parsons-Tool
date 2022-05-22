import Block from "./Block";

export default ({
    blocks,
    indices,
    moveBefore,
}) => <div className={"parsons-space"}>
    { indices.map(i => <Block moveBefore={moveBefore} id={i} {...blocks[i]} />) }
    <Block moveBefore={moveBefore} id={null}  />
</div>
