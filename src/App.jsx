import { Route, Routes } from "react-router-dom";
import "./App.css";
import LayoutPage from "./Pages/LayoutPage";
import RegistrationPage from "./Pages/RegistrationPage";
import PropertyViewPage from "./Pages/PropertyViewPage";
import UpdatePage from "./Pages/UpdatePage";


function App() {

  return (
      <Routes>
        <Route path="/" element={<LayoutPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/property/:id" element={<PropertyViewPage />} />
        <Route path="/update/:id" element={<UpdatePage/>} />
      </Routes>
  );
}

export default App;
