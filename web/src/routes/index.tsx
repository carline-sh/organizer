import { createFileRoute } from '@tanstack/react-router'


export const Route = createFileRoute('/')({
  component: RouteComponent,
})



function RouteComponent() {


  return (
    <div className="border border-gray-300 rounded-md p-2">

      <hr className="my-2 border-cyan-400" />

    </div>);
}


