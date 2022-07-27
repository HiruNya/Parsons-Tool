import { React } from 'react';
import { Routes, Route } from 'react-router-dom';
import PageLayout from './pages/PageLayout';
import StudentBrowseProblems from './pages/StudentBrowseProblems';
import ProblemEvaluation from './pages/ProblemEvaluation';
import ProblemGeneration from './pages/ProblemGeneration';
import { LoggingProvider } from './loggers/logContext';
import { BackendContextProvider } from './data/BackendContext';
import { AuthContextProvider } from './data/AuthContext';
import { ProtectedRoute } from './components/protectedRoute';
import Home from './pages/Home';

function App() {
  return (
    <>
      <AuthContextProvider>
        <BackendContextProvider>
          <LoggingProvider>
            <Routes>
              <Route path="home" element={<Home />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute requiredRole={false}>
                    <PageLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="student" element={<StudentBrowseProblems />} />
                <Route path="solve" element={<ProblemEvaluation />} />
                <Route
                  path="create"
                  element={
                    <ProtectedRoute requiredRole={true}>
                      <ProblemGeneration />
                    </ProtectedRoute>
                  }
                />
              </Route>
            </Routes>
          </LoggingProvider>
        </BackendContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
