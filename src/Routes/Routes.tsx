import {createBrowserRouter, createHashRouter} from "react-router-dom";
import App from "../app/App";

const router = createHashRouter([
    {
        path: "/",
        element: <App />,

    },
]);