import Footer from "./components/Footer";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="overflow-hidden">
      <ToastContainer />
      <Header />
      <div className="min-h-[90vh]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default App;
