import React, { useCallback } from 'react';

import Block from '../blocks/Block';
import { SortableContext } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';

const Space = ({
  name,
  blocks,
  matches,
  enableHorizontal,
  setInput,
  height,
  showGuildelines,
  draggedGuidePosition,
}) => {
  const { setNodeRef } = useDroppable({
    id: name,
  });
  const renderCard = useCallback(
    (card, index) => (
      <Block
        key={card.id}
        index={index}
        id={card.id}
        text={card.text}
        fadedIndices={card.fadedIndices}
        indentation={card.indentation}
        enableHorizontal={enableHorizontal}
        currentInputs={card.currentInputs}
        setInput={(fadedIndex, newValue) => setInput(card.id, fadedIndex, newValue)}
      />
    ),
    [enableHorizontal, setInput],
  );
  return (
    <div
      className="p-2 ml-2 mr-2 w-1/2 overflow-auto border-solid rounded-lg border-2 border-gray-400"
      style={{ height: height * 3.7 + 'rem', position: 'relative' }}
      ref={setNodeRef}
    >
      <SortableContext items={blocks} id={name}>
        {blocks.map(renderCard)}
      </SortableContext>
      {showGuildelines && enableHorizontal && <div style={guidelines}></div>}
      {!!draggedGuidePosition && (
        <div
          className="absolute h-full w-0 border-[1px] border-dashed border-gray-400 top-0"
          style={{ left: draggedGuidePosition * 40 + 8 + 'px' }}
        ></div>
      )}
    </div>
  );
};

const guidelines = {
  position: 'absolute',
  zIndex: -1,
  background: 'repeating-linear-gradient(to right, transparent, transparent 39px, grey 40px)',
  width: 'min(8 * 40px, 100%)',
  height: '100%',
  top: 0,
  left: '8px',
};

export default Space;
