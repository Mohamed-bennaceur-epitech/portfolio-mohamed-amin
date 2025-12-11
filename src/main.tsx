import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Playground from "./Pages/Playground";
import VirtualSpacePage from "./Pages/VirtualsSpace";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/playground" element={<Playground />} />
        <Route path="/virtual-space" element={<VirtualSpacePage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
