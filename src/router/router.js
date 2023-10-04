import { createBrowserRouter } from "react-router-dom";
import App from "../components/App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/tasks",
    element: <p>Tasks</p>,
  },
]);
