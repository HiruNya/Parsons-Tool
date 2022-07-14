import logDataEvent from './logDataEvent';

const logBlockDrag = ({ blockId, newSpace, newIndex, newIndentation }) =>
  logDataEvent({
    type: 'BLOCK_DRAG',
    blockId,
    eventDetails: `Moved to ${newSpace}, ${newIndex}, ${newIndentation}`,
    context: {
      space: newSpace,
      index: newIndex,
      indentation: newIndentation,
    },
  });

export default logBlockDrag;
