import { BrowserRouter, RouterProvider, createBrowserRouter, Link } from "react-router-dom";
import Home from "./components/pages/Home";
import Company from "./components/pages/Company";
import NewProject from "./components/pages/NewProject";
import Contact from "./components/pages/Contact";
import Main from "./Main";
import Container from "./components/layouts/Container";
import Projects from "./components/pages/Projects";
import Project from "./components/pages/Project";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/company",
          element: <Company />
        },
        {
          path: "/contact",
          element: <Contact />
        },
        {
          path: "/newproject",
          element: <NewProject />
        },{
          path: "/projects",
          element: <Projects/>
        },{
          path: '/project/:id',
          element: <Project/>
        }
      ]

    }
  ])

  return (
    <div>
        <RouterProvider router={router} />
    </div>
  )
}

export default App;
