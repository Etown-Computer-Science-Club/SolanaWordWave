import { Flex, Box } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "@solana/wallet-adapter-react-ui/styles.css";
import "./App.css";
import SelectGame from "./components/SelectGame";

function App() {
  return (
    <Router>
      <Flex flexDirection="column" minHeight="100vh">
        <Navbar />
        <Flex flex="1" direction="column" p="4">
          <Routes>
            <Route path="/" element={<SelectGame/>} />
          </Routes>
        </Flex>
        <Footer />
      </Flex>
    </Router>
  );
}

export default App;
