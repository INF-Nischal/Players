import Footer from "./components/Footer";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="overflow-hidden">
      <Header />
      <div className="min-h-[80vh] px-8 py-4">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default App;
