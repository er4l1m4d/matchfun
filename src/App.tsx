import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ErrorBoundary from "./components/ErrorBoundary";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Live from "./pages/Live";
import MatchView from "./pages/MatchView";
import Rank from "./pages/Rank";
import NFTs from "./pages/NFTs";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/live" element={<Live />} />
          <Route path="/live/:matchId" element={<MatchView />} />
          <Route path="/rank" element={<Rank />} />
          <Route path="/nfts" element={<NFTs />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  );
}
