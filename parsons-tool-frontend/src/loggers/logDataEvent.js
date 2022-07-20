const logDataEvent = ({ type, blockId, eventDetails, context }) => ({
  eventType: type,
  blockID: blockId,
  timestamp: Date.now(),
  eventMsg: eventDetails,
  context,
});

export default logDataEvent;
