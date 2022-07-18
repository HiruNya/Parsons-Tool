import { React } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProblemInfoCard from './components/problemInfoCard/problemInfoCard';
import PageLayout from './pages/PageLayout';
import StudentBrowseProblems from './pages/StudentBrowseProblems';
import ParsonsProblem from './components/parsonsProblem';
import ProblemEvaluation from './pages/ProblemEvaluation';
import ProblemGeneration from './pages/ProblemGeneration';
import { LoggingProvider } from './loggers/logContext';
import { DataContextProvider } from './data/DataContext';

function App() {
  return (
    <>
      <DataContextProvider>
        <LoggingProvider>
          <Routes>
            <Route path="/" element={<PageLayout />}>
              <Route index element={<ProblemInfoCard />} />
              <Route path="student" element={<StudentBrowseProblems />} />
              <Route path="solve" element={<ProblemEvaluation />} />
              <Route path="create" element={<ProblemGeneration />} />
            </Route>
          </Routes>
        </LoggingProvider>
      </DataContextProvider>
    </>
  );
}

export default App;
