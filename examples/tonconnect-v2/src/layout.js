import { routes } from "./router"
import { Outlet } from 'react-router-dom'
import { useMatches, useNavigate, useLocation, useRoutes, useMatch, useNavigation } from 'react-router-dom'
import "./layout.css"


function Header() {

    const navigate = useNavigate()
    return (
        <header>
            {
                routes.map((route, index) => (
                    <div key={index} className="header-item" onClick={() => location.href = route.path}>
                        {route.name}
                    </div>
                ))

            }
        </header>
    )
}

export default function Layout({ children }) {
    return (
        <div>
            <Header />
            <Outlet />
        </div>
    )

}