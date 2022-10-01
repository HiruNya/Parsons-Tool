import { useBackend } from '../data/BackendContext';
import { useEffect } from 'react';

const SubmissionState = () => {
  const { submissionState, fetchSubmissionState } = useBackend();
  useEffect(() => {
    fetchSubmissionState();
  }, [fetchSubmissionState]);
  return (
    <div className="flex flex-col items-center gap-4 pt-4">
      <h1 className="text-lg">Problems</h1>
      <ul className="flex flex-col gap-4">
        {submissionState.map((s) => (
          <li key={s._id} className={'p-4 border flex-col' + (s.completedTime ? ' bg-green-400' : '')}>
            <div>{s.problemName}</div>
            <div className="text-end">
              {(s.completedTime && `Completed at ${s.completedTime}`) || 'Not yet completed'}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubmissionState;
