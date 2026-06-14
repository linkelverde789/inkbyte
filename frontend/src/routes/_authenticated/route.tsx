import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context }) => {
    await context.auth.sessionReady;
    if (!context.auth.isAuthenticated) {
      throw redirect({ to: "/auth" });
    }
    return { user: context.auth.user! };
  },
  component: () => <Outlet />,
});
