import { lazy } from "react";

export const routes = [
  {
    path: "/posts",
    exact: true,
    componentName: "Posts",
    Component: lazy(() => import("../pages/Posts/Posts")),
  },
  {
    path: "/post/:id",
    exact: true,
    componentName: "Post",
    Component: lazy(() => import("../pages/Post/Post")),
  },
];
