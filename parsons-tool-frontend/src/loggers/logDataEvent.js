const logDataEvent = ({ type, blockId, eventDetails, context }) => {
  const logEvent = {
    type,
    blockID: blockId,
    timestamp: Date.now(),
    eventDetails,
    context,
  };
  console.log(logEvent);
};

export default logDataEvent;
