// export * from "react-router-dom"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'


import Layout from './layout';
import TonconnectSdk from './pages/tonconnectSdk';
import TonconnectUiReact from './pages/tonconnectUiReact';

export const routes = [

    {
        name: "tonconnect-sdk",
        path: "tonconnectsdk",
        Component: TonconnectSdk,
    },
    {
        name: "tonconnect-ui-react",
        path: "/",
        Component: TonconnectUiReact,
    }
]
const router = createBrowserRouter([
    {
        path: "/",
        Component: Layout,
        children: routes,
    }
]);

export default function () {
    return (
        <RouterProvider
            router={router}
            fallbackElement={
                <div>...Loading</div>
            } />
    )
};