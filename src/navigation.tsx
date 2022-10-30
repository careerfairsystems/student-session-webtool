import React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { API } from "./api";
import { AuthContext } from "./components/AuthContext";
import Applications from "./pages/Applications";
import FinalizeSignUpScreen from "./pages/Finalize-signup";
import Home from "./pages/Home";
import ResetPasswordScreen from "./pages/Reset-password";
import SignIn from "./pages/SignIn";
import Done from "./pages/Done";
import { Role } from "./api/users";

export default function navigation() {
  const [signedIn, setSignedIn] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(true);

  const authContext = {
    signIn: () => {
      setSignedIn(true);
    },
    signOut: () => {
      setSignedIn(false);
    }
  };

  // Set initial state if already signed in
  React.useEffect(() => {
    setLoading(true);
    const bootstrap = async () => {
      const authenticated = await API.auth.isAuthenticated();
      const role = await API.auth.getUserRole();
      setSignedIn(authenticated && role === Role.CompanyRepresentative);
    }
    bootstrap();
    setLoading(false);
  }, []);
  if(loading) {
    return <div>Loading...</div>
  }
  return (
    <AuthContext.Provider value={authContext}> 
      <Routes>
        <Route path="/" element={signedIn ? <Navigate to="/home" replace /> : <Navigate to="/sign_in" replace />} />
        <Route path="/home" element={signedIn ? <Home /> : <Navigate to="/sign_in" replace />}/>
        <Route path="/applications" element={signedIn ? <Applications /> : <Navigate to="/sign_in" replace />}/>
        <Route path="/done" element={<Done />} />
        <Route path="/sign_in" element={signedIn ? <Navigate to="/home" replace />: <SignIn/>} />
        <Route path="/finalize_signup/:token" element={<FinalizeSignUpScreen/>} />
        <Route path="/reset_password/:token" element={<ResetPasswordScreen/>} />
        <Route path="*" element={<div>Not found</div>} />
      </Routes>
    </AuthContext.Provider>
  )
}

