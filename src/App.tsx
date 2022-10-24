import { Route, Routes } from 'react-router-dom';
import Applications from './pages/Applications';
import Home from './pages/Home';
import SignIn from './pages/SignIn';

function App() {
  
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/applications" element={<Applications />} />
    </Routes>
  );
}

export default App
