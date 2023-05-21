import { BrowserRouter } from "react-router-dom";
import TopNavbar from "./components/TopNavbar";
import InvRoutes from './pages/routes/InvRoutes';

function App() {
  return (
    <>
      <BrowserRouter>
        <TopNavbar />
        <InvRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
