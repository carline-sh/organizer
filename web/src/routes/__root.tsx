import { createRootRoute, Link, Outlet } from '@tanstack/react-router'

const RootLayout = () => (
    <div className='w-full max-w-3xl mx-auto'>
        <div className="p-2 flex gap-2 bg-green-500">
            <Link to="/" className="[&.active]:font-bold">
                Home
            </Link>{' '}
            <Link to="/about" className="[&.active]:font-bold">
                About
            </Link>
        </div>
        <hr />
        <Outlet />
        {/* <TanStackRouterDevtools /> */}
    </div>
)

export const Route = createRootRoute({ component: RootLayout })