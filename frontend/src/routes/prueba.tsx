import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/prueba')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/prueba"!</div>
}
