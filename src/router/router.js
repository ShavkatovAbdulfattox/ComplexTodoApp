import { createBrowserRouter } from "react-router-dom";
import App from "../components/App";
import MyBoard from "../components/MyBoard/MyBoard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/board/:nameAndId",
    element: <MyBoard />,
  },
]);
