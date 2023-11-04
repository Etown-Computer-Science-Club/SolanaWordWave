import { Flex, Box } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "@solana/wallet-adapter-react-ui/styles.css";
import "./App.css";
import SelectGame from "./components/SelectGame";
import EasyGame from "./components/Games/EasyGame";
import MediumGame from "./components/Games/MediumGame";
import HardGame from "./components/Games/HardGame";

function App() {
  return (
    <Router>
      <Flex flexDirection="column" minHeight="100vh">
        <Navbar />
        <Flex flex="1" direction="column" p="4">
          <Routes>
            <Route path="/" element={<SelectGame/>} />
            <Route path="/easy" element={<EasyGame />} />
            <Route path="/medium" element={<MediumGame />} />
            <Route path="/hard" element={<HardGame />} />
          </Routes>
        </Flex>
        <Footer />
      </Flex>
    </Router>
  );
}

export default App;
