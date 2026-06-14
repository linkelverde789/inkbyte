import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import type { RouterContext } from "./routes/__root";

const queryClient = new QueryClient();

export const router = createRouter({
  routeTree,
  context: {
    queryClient,
    auth: undefined!,
  },
  scrollRestoration: true,
  defaultPreloadStaleTime: 0,
});

export type AppRouter = typeof router;

declare module "@tanstack/react-router" {
  interface Register {
    router: AppRouter;
  }
}

export type { RouterContext };
