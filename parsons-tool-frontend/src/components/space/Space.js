import React, { useCallback } from 'react';

import Block from '../blocks/Block';
import { SortableContext } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';

const Space = ({ name, blocks, matches, enableHorizontal, setInput }) => {
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
    <div className="p-2 ml-2 mr-2 w-1/2 h-96 border-solid rounded-lg border-2 border-gray-400" ref={setNodeRef}>
      <SortableContext items={blocks} id={name}>
        {blocks.map(renderCard)}
      </SortableContext>
    </div>
  );
};

export default Space;
