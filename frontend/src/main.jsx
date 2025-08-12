import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter , RouterProvider } from "react-router-dom";

import Login from "./components/Login.jsx";

const router = createBrowserRouter([
  { path:'/',
    element:<App/>

  },
   {
        path:'login',
        element:<Login/>
      }
])
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);
