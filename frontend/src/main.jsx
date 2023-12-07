import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Form, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import LandingPage from "./components/LandingPage.jsx";
import PlayerForm from "./components/PlayerForm.jsx";
import PlayerDetails from "./components/PlayerDetails.jsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/newplayer",
        element: <PlayerForm />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/players",
        element: <PlayerDetails />,
        errorElement: <ErrorPage />,
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
