import { Route, Routes } from 'react-router-dom';
import Applications from './pages/Applications';
import FinalizeSignUpScreen from './pages/Finalize-signup';
import Home from './pages/Home';
import ResetPasswordScreen from './pages/Reset-password';
import SignIn from './pages/SignIn';

function App() {
  
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/applications" element={<Applications />} />
      <Route path="/finalize_signup/:token" element={<FinalizeSignUpScreen/>} />
      <Route path="/reset_password/:token" element={<ResetPasswordScreen/>} />
      <Route path="*" element={<div>Not found</div>} />
    </Routes>
  );
}

export default App
