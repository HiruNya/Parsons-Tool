import { useBackend } from '../data/BackendContext';
import { useEffect } from 'react';
import BackButton from '../components/BackButton';

const SubmissionState = () => {
  const { submissionState, fetchSubmissionState } = useBackend();
  useEffect(() => {
    fetchSubmissionState();
  }, [fetchSubmissionState]);
  return (
    <div className="flex flex-col items-center gap-4 pt-4">
      <BackButton text="Return to Main Screen" />
      <h1 className="text-lg">Problems</h1>
      <ul className="flex flex-col gap-4">
        {submissionState.map((s) => {
          const datetime = new Date(s.completedTime);
          return (
            <li key={s._id} className={'p-4 border flex-col rounded-2xl' + (s.completedTime ? ' bg-green-400' : '')}>
              <div>{s.problemName}</div>
              <div className="text-end">
                {(s.completedTime &&
                  `Completed at ${datetime.getHours()}:${datetime.getMinutes()} on ${datetime.getDate()}/${
                    datetime.getMonth() + 1
                  }`) ||
                  'Not yet completed'}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SubmissionState;
