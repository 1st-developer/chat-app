import { createBrowserRouter } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import NotFound from "./Pages/NotFound";
import Chat from "./Pages/Chat";
import Register from "./Pages/Auth/Register";
import Login from "./Pages/Auth/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    children: [
      {
        path: "/chat/:ID",
        element: <Chat />
      },
      {
        path: "*",
        element: <NotFound />
      }
    ]
  },
  {
    path: "/auth",
    children: [
      {
        path: "login",
        element: <Login />
      },
      {
        path: "register",
        element: <Register />
      }
    ]
  }
]);
