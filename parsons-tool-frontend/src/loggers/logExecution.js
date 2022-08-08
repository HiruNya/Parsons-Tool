import logDataEvent from './logDataEvent';

const logExecution = (event) =>
  logDataEvent({
    type: 'EXECUTION',
    eventDetails: 'Execution Result',
    context: event,
  });
export default logExecution;
