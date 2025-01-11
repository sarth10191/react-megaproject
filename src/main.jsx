import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Protected from './components/AuthLayout.jsx'
import Home from "./components/Pages/Home.jsx"
import Login from "./components/Pages/Login.jsx"
import Signup from "./components/Pages/Signup.jsx"
import Post from "./components/Pages/Post.jsx"


const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:"/",
        element: <Home></Home>
      },
      {
        path:"/login",
        element: <Protected authentication={false}>
          <Login></Login>
        </Protected>
      },
      {
        path: "/signup",
        element: (
            <Protected authentication={false}>
                <Signup />
            </Protected>
        ),
    },
      {
        path:"/post/:slug",
        element: <Post></Post>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}></RouterProvider>
    </Provider>
  </StrictMode>,
)
