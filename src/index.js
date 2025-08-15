import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ThemeProvider from "./components/Theme/ThemeProvider";
import { BrowserRouter, Routes, Route } from "react-router";
import EditorParserNewPage from "./components/EditorParser/EditorParserNewPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <ThemeProvider>
        <Routes>
          // <Route path="/" element={<App />}></Route>
          <Route
            path="/article/:id"
            element={<EditorParserNewPage></EditorParserNewPage>}
          ></Route>
          <Route path="*" element={<App />}></Route>{" "}
        </Routes>
      </ThemeProvider>
    </React.StrictMode>
  </BrowserRouter>
);
