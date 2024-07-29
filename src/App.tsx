import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Stock from './Pages/Stock';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Stock />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
