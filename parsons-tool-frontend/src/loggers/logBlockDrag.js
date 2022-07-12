import logDataEvent from './logDataEvent';

const logMoveBlock = ({ blockId, newSpace, newIndex, newIndentation }) =>
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

export default logMoveBlock;
