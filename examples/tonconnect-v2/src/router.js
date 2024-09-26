import { createBrowserRouter, redirect, RouterProvider, PathRouteProps } from 'react-router-dom'
export * from "react-router-dom"

import Layout from './layout';
export const routes = [

    {
        name: "tonconnect-ui",
        path: "/tonconnect-ui",
        // Component: TonconnectSdk,
        lazy: async ()=>{
            return {
                Component: (await import('./pages/tonconnectUi')).default
            }
        }
    },
    {
        name: "tonconnect-ui-react",
        path: "/",
        lazy: async ()=>{
            return {
                Component: (await import('./pages/tonconnectUiReact')).default
            }
        }
        // Component: TonconnectUiReact,
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