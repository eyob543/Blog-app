import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Layout from './components/Layout';
import ErrorPage from './components/ErrorPage';

import Blogs from './pages/Blogs'
import AddBlogs from './pages/AddBlogs';
import BlogDetail from './pages/BlogsDetail';

export default function App() {

  const router = createBrowserRouter([
    {
      path:'/',
      element: <Layout />,
      errorElement: <ErrorPage/>,
      children:[
        {
          index:true,
          element: <Blogs />
        },
        {
          path:'add-blog',
           element: <AddBlogs />
        },
        {
          path:'add-blog/:id',
          element:<BlogDetail/>
        }
      ]
    }
  ])

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}
