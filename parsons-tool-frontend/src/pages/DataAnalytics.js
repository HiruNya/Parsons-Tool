import React from 'react';
import DataLogObject from '../components/DataLogObject';
import { useBackend } from '../data/BackendContext';

function DataAnalytics() {
  const { dataLogs } = useBackend();
  return (
    <div>
      <p>Data Test</p>
      {dataLogs && dataLogs.length > 0 ? (
        dataLogs.map((data, index) => <DataLogObject dataLog={data} />)
      ) : (
        <p>No Data found</p>
      )}
    </div>
  );
}

export default DataAnalytics;
