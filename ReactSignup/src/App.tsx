import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Signin from "./components/Signing";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
