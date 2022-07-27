import { React } from 'react';
import { Routes, Route } from 'react-router-dom';
import PageLayout from './pages/PageLayout';
import StudentBrowseProblems from './pages/StudentBrowseProblems';
import ProblemEvaluation from './pages/ProblemEvaluation';
import ProblemGeneration from './pages/ProblemGeneration';
import { LoggingProvider } from './loggers/logContext';
import { BackendContextProvider } from './data/BackendContext';
import Login from './pages/Login';

function App() {
  return (
    <>
      <BackendContextProvider>
        <LoggingProvider>
          <Routes>
            <Route path="login" element={<Login />} />
            <Route path="/" element={<PageLayout />}>
              <Route path="student" element={<StudentBrowseProblems />} />
              <Route path="solve" element={<ProblemEvaluation />} />
              <Route path="create" element={<ProblemGeneration />} />
            </Route>
          </Routes>
        </LoggingProvider>
      </BackendContextProvider>
    </>
  );
}

export default App;
