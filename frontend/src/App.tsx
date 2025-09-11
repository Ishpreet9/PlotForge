import React from 'react'
import { createBrowserRouter, BrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';

const App = () => {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home/>
    },
  ])

  return (
    <div className='h-screen w-screen'>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
