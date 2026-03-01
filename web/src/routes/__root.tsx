import { createRootRoute, Link, Outlet } from '@tanstack/react-router'

const RootLayout = () => (
    <div className='w-full max-w-3xl mx-auto py-4 space-y-4'>
        <div className="p-2 flex gap-2 bg-cyan-500 text-white rounded-md">
            <Link to="/" className="[&.active]:font-bold">
                Home
            </Link>{' '}
            <Link to="/about" className="[&.active]:font-bold">
                About
            </Link>
        </div>

        <Outlet />
        {/* <TanStackRouterDevtools /> */}
    </div>
)

export const Route = createRootRoute({ component: RootLayout })