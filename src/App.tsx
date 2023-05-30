import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from "./Home";
import Layout from "./Layout";
import Missing from "./Missing";

function App() {
  return (
      <Routes>
          <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="*" element={<Missing />} />
          </Route>
      </Routes>
  );
}

export default App;
