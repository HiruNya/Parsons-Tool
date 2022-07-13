import logDataEvent from './logDataEvent';

const logSubmission = (submissionState) =>
  logDataEvent({
    type: 'SUBMISSION',
    eventDetails: `Submission Attempt`,
    context: submissionState,
  });

export default logSubmission;
