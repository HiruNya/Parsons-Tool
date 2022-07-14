const logDataEvent = ({ type, blockId, eventDetails, context }) => ({
  type,
  blockID: blockId,
  timestamp: Date.now(),
  eventDetails,
  context,
});

export default logDataEvent;
