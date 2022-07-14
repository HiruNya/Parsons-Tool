import logDataEvent from './logDataEvent';

const logInputSet = ({ blockId, fadedIndex, newValue }) =>
  logDataEvent({
    type: 'INPUT',
    blockId,
    eventDetails: `Input ${fadedIndex} is ${newValue}`,
    context: {
      fadedIndex,
      newValue,
    },
  });

export default logInputSet;
