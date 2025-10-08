import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter , RouterProvider } from "react-router-dom";

import Login from "./components/Login.jsx";
import LoggedInUser from "./components/LoggedInUser.jsx";
import Register from "./components/Register.jsx";
import UploadForm from "./components/UploadForm.jsx";

const router = createBrowserRouter([
  { path:'/',
    element:<LoggedInUser/>

  },
  {
    path:'/register',
    element:<UploadForm/>
  },
  {
        path:'login',
        element:<Login/>
  },
  {

  }
])
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);
