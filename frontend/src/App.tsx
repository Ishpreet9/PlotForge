import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Create from './pages/Create';

const App = () => {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home/>
    },
    {
      path: '/create',
      element: <Create/>
    }
  ])

  return (
    <div className='h-screen w-screen bg-neutral-800'>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
