import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { forwardRef } from 'react';

const Block = ({ id, text, index, fadedIndices, indentation, currentInputs, setInput, enableHorizontal }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const visibility = isDragging ? 'hidden' : undefined;

  if (transform && enableHorizontal) {
    transform.x = Math.floor(transform.x / 40) * 40;
  }

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    paddingLeft: indentation && enableHorizontal ? 4 + indentation * 40 + 'px' : undefined,
    visibility,
  };

  return (
    <PresentationalBlock
      ref={setNodeRef}
      style={style}
      text={text}
      indentation={indentation}
      fadedIndices={fadedIndices}
      innerProps={(index) => {
        const i = Math.floor(index / 2);
        return {
          onChange: (e) => setInput(i, e.target.value),
          value: currentInputs[i] ? currentInputs[i] : '',
        };
      }}
      {...attributes}
      {...listeners}
    />
  );
};

export const PresentationalBlock = forwardRef(({ text, fadedIndices, innerProps, ...otherProps }, ref) => (
  <div className={'flex'} ref={ref} {...otherProps}>
    {toFadedChildren(text, fadedIndices, innerProps)}
  </div>
));

const toFadedChildren = (text, fadedIndices, innerProps) => {
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
  return (
    <p className="py-2 px-4 mb-2 border-2 border-stone-400 border-solid rounded-full justify-start cursor-move bg-white">
      {spans.map(
        (span, index) =>
          (span !== null && <span key={index}>{span}</span>) || (
            <input
              key={index}
              type="text"
              className={'bg-stone-200 rounded-full px-1 mx-2'}
              style={{ width: '10ch' }}
              {...(innerProps ? innerProps(index) : null)}
            />
          ),
      )}
    </p>
  );
};

export default Block;
