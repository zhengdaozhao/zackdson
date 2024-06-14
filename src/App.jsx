
import React from "react";
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import HomePage from './pages/Home';
import Nav,{loader as NavLoader} from './pages/Nav';
import SubjectBookLayout from "./pages/SubjectBook";
import SubjectWritingLayout from "./pages/SubjectWriting";
import SubjectExtLayout from "./pages/SubjectExt";
import SubjectWrongLayout from "./pages/SubjectWrong";
import SubjectTestLayout from './pages/SubjectTest';
// import EmptyLayout from "./pages/EmptyPage";
// import SubjectManagement,{loader as subjectLoader} from "./pages/SubjectManagement";
import SubjectManagement,{loader as subjectLoader, action as subjectAction} from "./pages/SubjectManagement";
import DemoLayout from "./FileOrImage/Demo";

const router = createBrowserRouter([
  {
    path: '/',
      element: <HomePage />,
      // errorElement: <ErrorPage />,
      id: 'home',
    },
    {
      path: '/nav',
      element: <Nav />,
      id: 'navigation',
      loader: NavLoader,
      children: [
      { path: '/nav/branch1', element: <SubjectBookLayout /> },
      { path: '/nav/demo', element: <DemoLayout /> },
      // { path: '/nav/empty', element: <EmptyLayout /> },
      { path: '/nav/manage', 
        element: <SubjectManagement />,
        loader: subjectLoader,
        action: subjectAction
      },
      // { path: '/review', 
      //     element: <Review />,
      //     loader:reviewLoader,
      //     action:reviewAction,
      //     children:[
      //   {
      //     path: "contacts/:contactId",
      //     element: <Contact />,
      //     loader: contactLoader,
      //   },
      //   {
      //     path: "contacts/:contactId/edit",
      //     element: <EditContact/>,
      //     action: editAction,
      //     loader: contactLoader,
      //   },
      //   {
      //     path: "contacts/:contactId/destroy",
      //     action: delAction,
      //     // loader: contactLoader,
      //   },
      // ] },
      // {
      //   path: 'logout',
      //   // element: <Logout />,
      //   action: logoutAction,
      // },
     ],
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
