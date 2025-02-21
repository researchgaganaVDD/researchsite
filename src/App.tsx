import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import MedicalIntakeForm from './MedicalIntakeForm';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/form" element={<MedicalIntakeForm />} />
      </Routes>
    </>
  )
}

export default App
