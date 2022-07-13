import React, { useCallback, useContext, useMemo, useState } from 'react';
import logBlockDragInner from './logBlockDrag';
import update from 'immutability-helper';

const LogContext = React.createContext({
  setInitialState: () => {},
  setCurrentState: () => {},
  logBlockDrag: () => {},
});

export const useLogging = () => useContext(LogContext);

export const LoggingProvider = ({ children }) => {
  const [initialProblem, setInitialProblem] = useState(null);
  const [currentState, setCurrentState] = useState({ problem: [], solution: [] });
  const [dataEvents, setDataEvents] = useState([]);
  const logBlockDrag = useCallback(
    (event) =>
      setDataEvents((oldDataEvents) =>
        update(oldDataEvents, {
          $push: [logBlockDragInner(event)],
        }),
      ),
    [],
  );
  children = useMemo(() => children, [children]);
  console.log(dataEvents);

  return (
    <LogContext.Provider
      children={children}
      value={{
        setInitialProblem,
        setCurrentState,
        logBlockDrag,
      }}
    />
  );
};
