import { useState } from "react";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import Home from "./pages/home/Home";

function App() {
  const [count, setCount] = useState(0);

  return <div className="p-4 h-screen flex items-center justify-center">
    {/* <Login />
    <SignUp /> */}
    <Home />
  </div>;
}

export default App;
