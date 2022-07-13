import React, { useCallback, useContext, useMemo, useState } from 'react';
import logBlockDragInner from './logBlockDrag';
import logInputSetInnner from './logInputSet';
import update from 'immutability-helper';

const LogContext = React.createContext({
  setInitialState: () => {},
  setCurrentState: () => {},
  logBlockDrag: () => {},
  logInputSet: () => {},
});

export const useLogging = () => useContext(LogContext);

export const LoggingProvider = ({ children }) => {
  const [initialProblem, setInitialProblem] = useState(null);
  const [currentState, setCurrentState] = useState({ problem: [], solution: [] });
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
  children = useMemo(() => children, [children]);
  console.log(dataEvents);

  return (
    <LogContext.Provider
      children={children}
      value={{
        setInitialProblem,
        setCurrentState,
        logBlockDrag,
        logInputSet,
      }}
    />
  );
};
