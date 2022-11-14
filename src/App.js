import "./App.css";
import SignIn from "./pages/Signin";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from "./pages/Signup";
import HomePage from "./pages/HomePage";
import Employee from "./pages/Employee";
import Projects from "./pages/Projects";
import AddNewEmployee from "./pages/AddNewEmployee";
import AddNewProject from "./pages/AddNewProject";

const router = createBrowserRouter([
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: "/home",
    element: <HomePage />
  },
  {
    path: "/employees",
    element: <Employee />,
  },
  {
    path: "/projects",
    element: <Projects />,
  },
  {
    path: "/employees/new",
    element: <AddNewEmployee />,
  },
  {
    path: "/projects/new",
    element: <AddNewProject />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
