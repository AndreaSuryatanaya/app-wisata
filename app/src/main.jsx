import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import DiaryFeedPage from "./features/diary/pages/DiaryFeedPage.jsx";
import DiaryContentPage from "./features/diary/pages/DiaryContentPage.jsx";
import { BrowserRouter, Route, Routes } from "react-router";

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<DiaryFeedPage />} />
            <Route path="/:id" element={<DiaryContentPage />} />
        </Routes>
    </BrowserRouter>
);
