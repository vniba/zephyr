import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' />
        <Route path='/dashboard' element={false} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
