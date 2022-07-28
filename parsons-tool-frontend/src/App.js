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
import Introduction from './pages/Introduction';
import { ProblemContextProvider } from './data/ProblemContext';

function App() {
  return (
    <>
      <AuthContextProvider>
        <BackendContextProvider>
          <ProblemContextProvider>
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
                  <Route path="intro" element={<Introduction />} />
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
          </ProblemContextProvider>
        </BackendContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
