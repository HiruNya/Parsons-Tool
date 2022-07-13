import { React, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import update from 'immutability-helper';
import ProblemInfoCard from './components/problemInfoCard/problemInfoCard';
import PageLayout from './pages/PageLayout';
import StudentBrowseProblems from './pages/StudentBrowseProblems';
import data from './data/recursion-parsons.json';
import ParsonsProblem from './components/parsonsProblem';
import ProblemEvaluation from './pages/ProblemEvaluation';
import ProblemGeneration from './pages/ProblemGeneration';
import { LoggingProvider } from './loggers/logContext';

function App() {
  const [problemSet, updateProblems] = useState(data);

  function createProblem(newProblem) {
    console.log(newProblem);

    const newSet = update(problemSet, {
      problems: {
        $push: [newProblem],
      },
    });
    console.log(newSet);

    updateProblems(newSet);
  }

  return (
    <>
      <LoggingProvider>
        <Routes>
          <Route path="/" element={<PageLayout />}>
            <Route index element={<ProblemInfoCard />} />
            <Route path="problems" element={<ParsonsProblem problem={problemSet.problems[1].problem} />} />
            <Route path="student" element={<StudentBrowseProblems problems={problemSet.problems} />} />
            <Route path="solve" element={<ProblemEvaluation />} />
            <Route path="create" element={<ProblemGeneration addProblem={createProblem} />} />
          </Route>
        </Routes>
      </LoggingProvider>
    </>
  );
}

export default App;
