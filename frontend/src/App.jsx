import { useState } from "react";
import Login from "./pages/login/Login";

function App() {
  const [count, setCount] = useState(0);

  return <div className="p-4 h-screen flex items-center justify-normal">
    <Login />
  </div>;
}

export default App;
