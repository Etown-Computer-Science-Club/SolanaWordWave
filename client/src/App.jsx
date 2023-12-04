import { Flex } from "@chakra-ui/react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useWallet } from '@solana/wallet-adapter-react';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "@solana/wallet-adapter-react-ui/styles.css";
import "./App.css";
import SelectGame from "./components/SelectGame";
import EasyGame from "./components/Games/EasyGame";
import MediumGame from "./components/Games/MediumGame";
import HardGame from "./components/Games/HardGame";
import { useEffect } from "react";


function App() {
  const { connected } = useWallet();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname !== "/") {
      navigate("/");
    }
  }, [connected])

  return (
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
  );
}

export default App;
