import React, { useCallback, useContext, useMemo, useState } from 'react';
import logBlockDragInner from './logBlockDrag';
import logInputSetInnner from './logInputSet';
import logSubmissionInner from './logSubmission';
import update from 'immutability-helper';

const LogContext = React.createContext({
  setState: () => {},
  logSubmission: () => {},
  logBlockDrag: () => {},
  logInputSet: () => {},
});

export const useLogging = () => useContext(LogContext);

export const LoggingProvider = ({ children }) => {
  const [state, setState] = useState(null);
  const [dataEvents, setDataEvents] = useState([]);
  const log = useCallback(
    (params) =>
      setDataEvents((oldDataEvents) =>
        update(oldDataEvents, {
          $push: [params],
        }),
      ),
    [],
  );
  const logBlockDrag = useCallback((event) => log(logBlockDragInner(event)), [log]);
  const logInputSet = useCallback((event) => log(logInputSetInnner(event)), [log]);
  const logSubmission = useCallback(() => log(logSubmissionInner(state)), [log, state]);
  children = useMemo(() => children, [children]);
  console.log("Data Log", dataEvents);

  return (
    <LogContext.Provider
      children={children}
      value={{
        setState,
        logSubmission,
        logBlockDrag,
        logInputSet,
      }}
    />
  );
};
