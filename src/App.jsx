import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminPortal from './pages/AdminPortal';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminPortal />} />
      </Routes>
    </Router>
  );
}

export default App;