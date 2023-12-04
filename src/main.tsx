import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import CallRoom from "./components/CallRoom.tsx";
import "./index.css";
import { ChannelProvider } from "./components/Context.tsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/callRoom",
        element: <CallRoom />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <ChannelProvider>
        <RouterProvider router={router} />
    </ChannelProvider>
);
