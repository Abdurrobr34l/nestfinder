import Footer from "../Components/Layout/Footer";
import Navbar from "../Components/Layout/Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="p-8 text-gray-800 dark:text-white min-h-[calc(100vh-440px)]">Home Page</div>
      <Footer />
    </div>
  );
};

export default Home;
