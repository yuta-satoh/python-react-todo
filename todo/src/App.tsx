import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Top from './pages/Top';
import Edit from './pages/Edit';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Top />} />
        <Route path="/edit/:id" element={<Edit />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
