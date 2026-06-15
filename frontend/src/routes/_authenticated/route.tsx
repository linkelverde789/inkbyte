import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: ({ context }) => {
    console.log("AUTH CONTEXT", context.auth);

    if (context.auth.loading) {
      return;
    }

    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/auth",
      });
    }

    return {
      user: context.auth.user,
    };
  },

  component: () => <Outlet />,
});