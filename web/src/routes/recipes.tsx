import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/recipes')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>THis is the recipes page uauau"!</div>
}
