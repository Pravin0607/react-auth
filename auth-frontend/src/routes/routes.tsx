import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import PrivateComponent from "../components/PrivateComponent";

const Router=createBrowserRouter([
    {
        path:'/',
        element:<Home/>
    },
    {
        path:'/tasks',
        element:<PrivateComponent><div>Tasks</div></PrivateComponent>
    },
    {
        path:'/login',
        element:<div>Login</div>
    },
    {
        path:'/signup',
        element:<div>Signup</div>
    },
    {
        path:'/email-verification',
        element:<div>Email verifications</div>
    },
    {
        path:'password-reset',
        element:<div>Password Reset</div>
    }
])

export default Router;