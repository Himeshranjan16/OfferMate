import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Skills from './pages/Skills';
import Opportunities from './pages/Opportunities';
import { INITIAL_STUDENT, MOCK_COMPANIES } from './data/mockData';

function App() {
  const [student, setStudent] = useState(INITIAL_STUDENT);
  const [companies, setCompanies] = useState(MOCK_COMPANIES);

  const handleApply = (id) => {
    setCompanies(prev => prev.map(c =>
      c.id === id ? { ...c, applied: true } : c
    ));
    // Optional: Show toast or alert
    alert("Application Submitted!");
  };

  const updateSkill = (skillName, value) => {
    setStudent(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        [skillName]: parseInt(value)
      }
    }));
  };

  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route
              path="/dashboard"
              element={
                <Dashboard
                  student={student}
                  companies={companies}
                  onApply={handleApply}
                />
              }
            />
            <Route
              path="/skills"
              element={
                <Skills
                  student={student}
                  updateSkill={updateSkill}
                />
              }
            />
            <Route
              path="/opportunities"
              element={
                <Opportunities
                  student={student}
                  companies={companies}
                  onApply={handleApply}
                />
              }
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
