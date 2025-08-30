import { useState } from 'react'
import './App.css'
import HomePage from './component/homepage'
import Services from './component/services'   // Capitalized
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />
    },
    {
      path: "/services",
      element: <Services />
    }
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
