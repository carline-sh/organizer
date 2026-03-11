import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="border border-gray-300 rounded-md p-4">
      <div className="">
        <h1 className="text-xl text-cyan-700">This is organizer</h1>
        <p>A tool to help you organize your life.</p>
      </div>
      <hr className="my-2 border-cyan-400" />
      <div className="">
        <h2 className="text-lg text-cyan-700">Features</h2>
        <ul>
          <li>
            Add items to your
            {" "}
            <Link to="/groceries" className="link">groceries</Link>
            ,
          </li>
          <li>
            Keep track of items you have in
            {" "}
            <Link to="/stock" className="link">stock</Link>
            ,
          </li>
          <li>
            Save meals you like in
            {" "}
            <Link to="/recipes" className="link">recipes</Link>
            ,
          </li>
          <li>
            Plan your meals for the week in
            {" "}
            <Link to="/planning" className="link">planning</Link>
            .
          </li>
        </ul>
      </div>
    </div>
  );
}
